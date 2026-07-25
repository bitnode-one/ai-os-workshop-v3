import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { networkInterfaces } from "node:os";

const root = normalize(join(fileURLToPath(new URL(".", import.meta.url)), ".."));
let port = Number(process.env.PORT || 4173);
const shouldOpen = process.argv.includes("--open");
const isLan = process.argv.includes("--lan");
const host = isLan ? "0.0.0.0" : "127.0.0.1";
const types = {
  ".css": "text/css; charset=utf-8",
  ".excalidraw": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    if (pathname === "/__workshop.json") {
      const lanUrls = getLanAddresses().map((address) => `http://${address}:${port}`);
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(JSON.stringify({ isLan, port, lanUrls }));
      return;
    }
    const requested = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const file = normalize(join(root, requested));
    if (relative(root, file).startsWith("..")) return response.writeHead(403).end("Forbidden");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

function openBrowser(url) {
  if (!shouldOpen) return;
  const commands = {
    win32: ["cmd", ["/c", "start", "", url]],
    darwin: ["open", [url]],
    linux: ["xdg-open", [url]]
  };
  const [command, args] = commands[process.platform] || commands.linux;
  spawn(command, args, { detached: true, stdio: "ignore" }).unref();
}

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => entry.address)
    .filter((address, index, addresses) => addresses.indexOf(address) === index);
}

async function isThisWorkshop(candidatePort) {
  try {
    const response = await fetch(`http://127.0.0.1:${candidatePort}`, { signal: AbortSignal.timeout(800) });
    return response.ok && (await response.text()).includes("AI OS Workshop v3");
  } catch {
    return false;
  }
}

function announce() {
  const localUrl = `http://127.0.0.1:${port}`;
  console.log(`\nAI OS Workshop v3: ${localUrl}`);
  if (isLan) {
    const lanUrls = getLanAddresses().map((address) => `http://${address}:${port}`);
    console.log(lanUrls.length ? `Android / LAN: ${lanUrls.join("  |  ")}` : "No LAN address detected.");
  }
  console.log("Stop with Ctrl+C / Beenden mit Strg+C\n");
  openBrowser(localUrl);
}

server.on("error", async (error) => {
  if (error.code !== "EADDRINUSE") throw error;
  if (!isLan && await isThisWorkshop(port)) {
    const url = `http://127.0.0.1:${port}`;
    console.log(`\nAI OS Workshop v3 is already running / läuft bereits: ${url}\n`);
    openBrowser(url);
    return;
  }
  if (process.env.PORT) {
    console.error(`Port ${port} is already in use.`);
    process.exitCode = 1;
    return;
  }
  port += 1;
  console.log(`Port is occupied; using ${port}.`);
  server.listen(port, host, announce);
});

server.listen(port, host, announce);
