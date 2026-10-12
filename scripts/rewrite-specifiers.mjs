import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(root, "src");
const distRoot = path.join(root, "dist");
const sourceExtensions = [".tsx", ".ts", ".jsx", ".js"];

const sourceEquivalent = (filePath) => {
  const absolute = path.resolve(filePath);
  if (absolute.startsWith(distRoot + path.sep)) {
    return path.join(srcRoot, path.relative(distRoot, absolute));
  }
  return absolute;
};

const resolveSpecifier = (fromFile, specifier) => {
  if (
    specifier.endsWith(".js") ||
    specifier.endsWith(".css") ||
    specifier.endsWith(".json")
  ) {
    return null;
  }

  const fromSource = sourceEquivalent(fromFile);
  let base;
  if (specifier.startsWith("@/")) {
    base = path.join(srcRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    base = path.resolve(path.dirname(fromSource), specifier);
  } else {
    return null;
  }

  const candidates = sourceExtensions.flatMap((extension) => [
    base + extension,
    path.join(base, `index${extension}`),
  ]);
  const hit = candidates.find((file) => existsSync(file));
  if (!hit) return null;

  let relativePath = path.relative(path.dirname(fromSource), hit);
  if (!relativePath.startsWith(".")) relativePath = `./${relativePath}`;
  return relativePath
    .split(path.sep)
    .join("/")
    .replace(/\.tsx$/, ".js")
    .replace(/\.ts$/, ".js")
    .replace(/\.jsx$/, ".js");
};

const rewrite = (filePath, contents) =>
  contents.replace(
    /(from\s+["'])([^"']+)(["'])/g,
    (match, prefix, specifier, suffix) => {
      const rewritten = resolveSpecifier(filePath, specifier);
      return rewritten ? `${prefix}${rewritten}${suffix}` : match;
    },
  );

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.name.endsWith(".js") || entry.name.endsWith(".d.ts")) {
      files.push(fullPath);
    }
  }
  return files;
};

if (!existsSync(distRoot)) {
  process.stderr.write("dist/ não existe. Rode o tsup antes.\n");
  process.exit(1);
}

const files = await walk(distRoot);
let changed = 0;
for (const file of files) {
  const original = await readFile(file, "utf8");
  const next = rewrite(file, original);
  if (next !== original) {
    await writeFile(file, next);
    changed += 1;
  }
}

console.log(`rewrote specifiers in ${changed} files`);
