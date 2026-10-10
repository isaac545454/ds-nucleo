import { readFileSync } from "node:fs";

const version = process.argv[2];
const lines = readFileSync("CHANGELOG.md", "utf8").split(/\r?\n/);
const start = lines.findIndex((line) => line.startsWith(`## [${version}]`));

if (start === -1) {
  process.stdout.write(`Release ${version}\n`);
  process.exit(0);
}

const rest = lines.slice(start + 1);
const end = rest.findIndex((line) => line.startsWith("## ["));
const body = (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
process.stdout.write(`${body || `Release ${version}`}\n`);
