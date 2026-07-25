import { readFile, stat } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const requiredFiles = [
  "BACKLOG.md",
  "CHANGELOG.md",
  "RELEASE-CRITERIA.md",
  "CONTENT-BASELINE.json",
  "CONTENT-MANIFEST.json",
  "REMOVAL-APPROVALS.json",
  "REMOVAL-REQUEST-TEMPLATE.md",
  "NOTEBOOK-SETUP.md"
];

for (const file of requiredFiles) {
  const info = await stat(new URL(file, root));
  if (!info.isFile() || info.size === 0) throw new Error(`${file} fehlt oder ist leer.`);
}

const manifest = JSON.parse(await readFile(new URL("CONTENT-MANIFEST.json", root), "utf8"));
const baseline = JSON.parse(await readFile(new URL("CONTENT-BASELINE.json", root), "utf8"));
const removals = JSON.parse(await readFile(new URL("REMOVAL-APPROVALS.json", root), "utf8"));
const groups = ["contentBlocks", "handouts", "features"];
const entries = groups.flatMap((group) => manifest[group] || []);
const ids = new Set();

for (const entry of entries) {
  if (!entry.id || !entry.title) throw new Error("Manifest-Eintrag ohne ID oder Titel.");
  if (ids.has(entry.id)) throw new Error(`Doppelte Manifest-ID: ${entry.id}`);
  ids.add(entry.id);
  if (!manifest.allowedStatuses.includes(entry.status)) throw new Error(`Ungültiger Status für ${entry.id}: ${entry.status}`);
}

for (const approval of removals.approvals) {
  for (const field of removals.requiredFields) {
    if (!(field in approval)) throw new Error(`Löschantrag ${approval.id || "ohne ID"} enthält ${field} nicht.`);
  }
  if (!removals.allowedStatuses.includes(approval.status)) throw new Error(`Ungültiger Löschstatus: ${approval.status}`);
  if (!ids.has(approval.contentId)) throw new Error(`Löschantrag verweist auf unbekannte Content-ID: ${approval.contentId}`);
}

for (const entry of entries.filter((candidate) => candidate.required && candidate.status === "removed")) {
  const approval = removals.approvals.find((candidate) => candidate.contentId === entry.id && candidate.status === "approved");
  if (!approval) throw new Error(`Pflichtinhalt ${entry.id} wurde ohne genehmigten Löschantrag entfernt.`);
}

const baselineIds = [...baseline.contentIds, ...baseline.handoutIds, ...baseline.featureIds];
for (const baselineId of baselineIds) {
  if (ids.has(baselineId)) continue;
  const approval = removals.approvals.find((candidate) => candidate.contentId === baselineId && candidate.status === "approved");
  if (!approval) throw new Error(`Baseline-ID ${baselineId} fehlt ohne genehmigten Löschantrag.`);
}

const releasePath = typeof process === "undefined" ? "." : process.argv[2];
if (releasePath) {
  const indexUrl = new URL(`${releasePath.replaceAll("\\", "/").replace(/\/?$/, "/")}index.html`, root);
  const html = await readFile(indexUrl, "utf8");
  const presentIds = new Set(
    [...html.matchAll(/data-content-id="([^"]+)"/g)]
      .flatMap((match) => match[1].split(/\s+/))
      .filter(Boolean)
  );
  const requiredContent = manifest.contentBlocks.filter((entry) => entry.required && entry.status !== "removed");
  const missing = requiredContent.filter((entry) => !presentIds.has(entry.id));
  if (missing.length) throw new Error(`Pflichtinhalte fehlen im Release: ${missing.map((entry) => entry.id).join(", ")}`);
}

console.log(`OK: ${entries.length} gesteuerte Kriterien und ${baselineIds.length} Baseline-IDs, keine ungenehmigten Entfernungen.`);
