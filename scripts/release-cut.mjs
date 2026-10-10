import { appendFileSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const UNRELEASED = "## [Unreleased]";

export function unreleasedBody(markdown) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === UNRELEASED);
  if (start === -1) return "";
  let end = lines.findIndex((line, index) => index > start && line.startsWith("## ["));
  if (end === -1) end = lines.length;
  return lines.slice(start + 1, end).join("\n").trim();
}

export function hasReleaseNotes(markdown) {
  return unreleasedBody(markdown)
    .split("\n")
    .some((line) => line.startsWith("- "));
}

export function hasNewBullet(baseMarkdown, headMarkdown) {
  const base = new Set(
    unreleasedBody(baseMarkdown)
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => line.trim())
  );
  return unreleasedBody(headMarkdown)
    .split("\n")
    .some((line) => line.startsWith("- ") && !base.has(line.trim()));
}

export function bumpLevel(messages) {
  let level = "patch";
  for (const message of messages) {
    if (/^[a-z]+(\([^)]+\))?!:/m.test(message) || message.includes("BREAKING CHANGE")) {
      return "major";
    }
    if (/^feat(\([^)]+\))?:/m.test(message)) level = "minor";
  }
  return level;
}

export function bumpVersion(version, level) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

export function compareVersions(left, right) {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index];
  }
  return 0;
}

export function cutChangelog(markdown, version, date) {
  const notes = unreleasedBody(markdown);
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === UNRELEASED);
  let end = lines.findIndex((line, index) => index > start && line.startsWith("## ["));
  if (end === -1) end = lines.length;

  const trailingNewline = markdown.endsWith("\n");
  const next = [
    ...lines.slice(0, start),
    UNRELEASED,
    "",
    `## [${version}] - ${date}`,
    "",
    notes,
    "",
    ...lines.slice(end),
  ].join("\n");

  return trailingNewline || !next.endsWith("\n") ? `${next.replace(/\n$/, "")}\n` : next;
}

function setOutput(name, value) {
  const line = `${name}=${value}\n`;
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, line);
  else process.stdout.write(line);
}

function git(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

function commitMessages(version) {
  try {
    return git(`git log v${version}..HEAD --format=%s%n%b`);
  } catch {
    return git("git log --format=%s%n%b");
  }
}

function main() {
  const changelogPath = "CHANGELOG.md";
  const packagePath = "package.json";
  const changelog = readFileSync(changelogPath, "utf8");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

  if (!hasReleaseNotes(changelog)) {
    setOutput("released", "false");
    setOutput("commit", "false");
    setOutput("version", packageJson.version);
    return;
  }

  const notes = unreleasedBody(changelog);
  try {
    git("git fetch origin master");
    const originLog = git("git show origin/master:CHANGELOG.md");
    const originVersion = JSON.parse(git("git show origin/master:package.json")).version;
    if (
      compareVersions(originVersion, packageJson.version) > 0 &&
      !hasReleaseNotes(originLog) &&
      originLog.includes(notes.split("\n").find((line) => line.startsWith("- ")))
    ) {
      execSync("git reset --hard origin/master", { stdio: "inherit" });
      setOutput("released", "true");
      setOutput("commit", "false");
      setOutput("version", originVersion);
      return;
    }
  } catch (error) {
    process.stderr.write(`sem release anterior no remoto: ${error.message}\n`);
  }

  const level = bumpLevel(commitMessages(packageJson.version).split("\n"));
  const version = bumpVersion(packageJson.version, level);
  const date = new Date().toISOString().slice(0, 10);
  writeFileSync(changelogPath, cutChangelog(changelog, version, date));
  const rawPackage = readFileSync(packagePath, "utf8");
  writeFileSync(
    packagePath,
    rawPackage.replace(/"version":\s*"[^"]+"/, `"version": "${version}"`)
  );
  setOutput("released", "true");
  setOutput("commit", "true");
  setOutput("version", version);
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(realpathSync(entry)).href;
}

if (isDirectRun()) main();
