import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

import { hasNewBullet } from "./release-cut.mjs";

const baseRef = process.argv[2];
if (!baseRef) {
  process.stderr.write("uso: node scripts/check-unreleased.mjs <ref-base>\n");
  process.exit(1);
}

const base = execSync(`git show ${baseRef}:CHANGELOG.md`, { encoding: "utf8" });
const head = readFileSync("CHANGELOG.md", "utf8");

if (!hasNewBullet(base, head)) {
  process.stderr.write(
    "PR precisa de uma entrada nova em ## [Unreleased] no CHANGELOG.md.\n"
  );
  process.exit(1);
}
