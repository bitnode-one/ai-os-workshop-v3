import { access, readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const indexPath = join(root, "index.html");
const html = await readFile(indexPath, "utf8");
const slides = [...html.matchAll(/<section class="[^"]*\bslide\b[^"]*"/g)];

if (slides.length < 55 || slides.length > 70) {
  throw new Error(`Erwartet sind 55–70 Folien, gefunden: ${slides.length}.`);
}

const titleDe = [...html.matchAll(/data-title-de="[^"]+"/g)].length;
const titleEn = [...html.matchAll(/data-title-en="[^"]+"/g)].length;
if (titleDe !== slides.length || titleEn !== slides.length) {
  throw new Error(`Titelparität fehlt: ${titleDe} DE, ${titleEn} EN, ${slides.length} Folien.`);
}

const requiredFiles = [
  "assets/css/deck.css",
  "assets/js/deck.js",
  "assets/vendor/qrcode.js",
  "assets/images/flyer-de.jpg",
  "assets/images/flyer-en.jpg",
  "assets/diagrams/ai-os-architecture.svg",
  "assets/diagrams/ai-os-architecture.excalidraw",
  "handouts/index.html",
  "handouts/concepts.html",
  "handouts/quickstart.html",
  "handouts/exercises.html",
  "handouts/local-ai.html",
  "handouts/security.html",
  "LICENSE.md"
];

for (const file of requiredFiles) {
  const info = await stat(join(root, file));
  if (!info.isFile() || info.size === 0) throw new Error(`${file} fehlt oder ist leer.`);
}

const htmlFiles = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (extname(entry.name) === ".html") htmlFiles.push(absolute);
  }
}
await walk(root);

const broken = [];
for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|#)/.test(reference)) continue;
    const clean = reference.split("#")[0].split("?")[0];
    if (!clean) continue;
    try {
      await access(join(dirname(file), clean));
    } catch {
      broken.push(`${relative(root, file)} → ${reference}`);
    }
  }
}
if (broken.length) throw new Error(`Defekte lokale Links:\n${broken.join("\n")}`);

if (/https?:\/\/[^"')\s]+\.(?:js|css)/i.test(html)) {
  throw new Error("Externe JS/CSS-Laufzeitabhängigkeit gefunden.");
}
if (!html.includes("assets/vendor/qrcode.js")) throw new Error("Lokale QR-Bibliothek fehlt.");
if (!html.includes('class="home"')) throw new Error("Home-Button fehlt.");
if (!html.includes("data-content-id=")) throw new Error("Governance-IDs fehlen.");

const deckScript = await readFile(join(root, "assets/js/deck.js"), "utf8");
if (!deckScript.includes('className = "slide-license"') || !deckScript.includes("creativecommons.org/licenses/by-sa/4.0/")) {
  throw new Error("Klickbarer CC-BY-SA-Hinweis auf allen Folien fehlt.");
}

console.log(`OK: ${slides.length} Folien, ${htmlFiles.length - 1} Handout-Seiten, lokale Assets und Links geprüft.`);
