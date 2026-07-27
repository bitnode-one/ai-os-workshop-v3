import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "handouts", "pdf");
const port = Number(process.env.PDF_PORT || 4397);
const baseUrl = `http://127.0.0.1:${port}`;
const handouts = [
  { source: "index.html", target: "handouts-uebersicht.pdf", title: "Handouts - Übersicht" },
  { source: "concepts.html", target: "00-grundbegriffe.pdf", title: "KI-Grundbegriffe" },
  { source: "quickstart.html", target: "01-hermes-quickstart.pdf", title: "Hermes Desktop Quickstart" },
  { source: "exercises.html", target: "02-uebungen-prompts.pdf", title: "Übungen und Prompts" },
  { source: "local-ai.html", target: "03-lokale-ki-lm-studio.pdf", title: "Lokale KI mit LM Studio" },
  { source: "security.html", target: "04-sicherheit-troubleshooting.pdf", title: "Sicherheit und Troubleshooting" }
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const server = spawn(process.execPath, [join(root, "tools", "serve.mjs")], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"]
});

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/handouts/`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`PDF server did not start on ${baseUrl}`);
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (process.platform !== "win32") throw error;
    return chromium.launch({ channel: "msedge", headless: true });
  }
}

const footerTemplate = (title) => `
  <div style="width:100%;padding:0 12mm;color:#5d7180;font-family:'Segoe UI',sans-serif;font-size:8px;display:flex;align-items:center;justify-content:space-between;">
    <span>${title} · Max Peter · CC BY-SA 4.0</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

let browser;
try {
  await waitForServer();
  browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ media: "print" });

  for (const handout of handouts) {
    await page.goto(`${baseUrl}/handouts/${handout.source}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: join(output, handout.target),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: footerTemplate(handout.title),
      margin: { top: "10mm", right: "12mm", bottom: "18mm", left: "12mm" },
      tagged: true,
      outline: true
    });
    console.log(`PDF: handouts/pdf/${handout.target}`);
  }

  const combined = await PDFDocument.create();
  combined.setTitle("AI OS Workshop - Handouts");
  combined.setAuthor("Max Peter");
  combined.setSubject("KI-Agenten, Hermes Desktop, lokale KI und sichere Agenten-Workflows");
  combined.setKeywords(["AI OS", "KI-OS", "Hermes", "LM Studio", "Agentic AI"]);
  for (const handout of handouts.slice(1)) {
    const source = await PDFDocument.load(await readFile(join(output, handout.target)));
    const pages = await combined.copyPages(source, source.getPageIndices());
    pages.forEach((page) => combined.addPage(page));
  }
  await writeFile(join(output, "ai-os-workshop-handouts-komplett.pdf"), await combined.save());
  console.log("PDF: handouts/pdf/ai-os-workshop-handouts-komplett.pdf");
} finally {
  await browser?.close();
  server.kill();
}
