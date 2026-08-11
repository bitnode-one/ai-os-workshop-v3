import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const packageMetadata = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const baselineUrl = new URL(`baselines/${packageMetadata.version}.json`, root);
const baselineInfo = await stat(baselineUrl);
if (!baselineInfo.isFile() || baselineInfo.size === 0) {
  throw new Error(`Prüfsummen-Baseline für Release ${packageMetadata.version} fehlt.`);
}

const baseline = JSON.parse(await readFile(baselineUrl, "utf8"));
if (baseline.release !== packageMetadata.version) {
  throw new Error(`Baseline ${baseline.release} passt nicht zu package.json ${packageMetadata.version}.`);
}

const mismatches = [];
for (const [file, expectedHash] of Object.entries(baseline.files)) {
  const content = await readFile(new URL(file, root));
  const actualHash = createHash("sha256").update(content).digest("hex");
  if (actualHash !== expectedHash) mismatches.push(file);
}

if (mismatches.length) {
  throw new Error(`Eingefrorene Release-Dateien verändert: ${mismatches.join(", ")}. Neue Version, Changelog und Baseline erforderlich.`);
}

console.log(`OK: Release ${baseline.release}, ${Object.keys(baseline.files).length} eingefrorene Dateien unverändert.`);
