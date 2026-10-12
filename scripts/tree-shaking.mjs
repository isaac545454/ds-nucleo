#!/usr/bin/env node

/**
 * Measures the tree-shaken bundle size of every value this package exports, by
 * building one esbuild single-import consumer per export.
 *
 * Adapted for @isaac545454/nucleus from the tree-shaking report written by
 * Hyan Mandian for brazilian-utils:
 * https://github.com/brazilian-utils/javascript/blob/main/scripts/tree-shaking.ts
 *
 * Copyright (c) 2018 Hyan Mandian
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Local changes: React components are measured too (`forwardRef` returns an
 * object, not a function), `react` and `react/jsx-runtime` stay external, and
 * the package name comes from package.json.
 *
 * Usage:
 *   node scripts/tree-shaking.mjs
 *   node scripts/tree-shaking.mjs --json <path>
 *   node scripts/tree-shaking.mjs --json <path> --surviving <head.json>
 *   node scripts/tree-shaking.mjs --compare <base.json> [--markdown <path>]
 */

import { existsSync, readFileSync } from "node:fs";
import { mkdir, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

import { build } from "esbuild";

const rootDirectory = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(
  readFileSync(resolve(rootDirectory, "package.json"), "utf8"),
);
const packageName = packageJson.name;

const COMPARISON_ERROR_EXIT_CODE = 2;

const CONCURRENCY = 4;
const FULL_IMPORT_KEY = "__full__";

const REGRESSION_PERCENT_THRESHOLD = 0.2;
const REGRESSION_BYTES_THRESHOLD = 256;
const FULL_IMPORT_PERCENT_THRESHOLD = 0.05;

const EXTERNAL = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
];

const OPTION_FLAGS = new Map([
  ["--json", "json"],
  ["--surviving", "surviving"],
  ["--compare", "compare"],
  ["--markdown", "markdown"],
  ["--dist", "dist"],
]);

const parseArgs = (argv) => {
  const args = {
    json: undefined,
    surviving: undefined,
    compare: undefined,
    markdown: undefined,
    dist: undefined,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const option = OPTION_FLAGS.get(argv[index]);
    if (option === undefined) continue;
    index += 1;
    args[option] = argv[index];
  }
  return args;
};

const mapWithConcurrency = async (items, limit, transform) => {
  const results = Array.from({ length: items.length });
  let cursor = 0;

  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      const item = items[index];
      if (item !== undefined) {
        results[index] = await transform(item);
      }
    }
  };

  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    worker(),
  );
  await Promise.all(workers);
  return results;
};

const bundleSource = async (source, sourcefile, resolveDirectory) => {
  const result = await build({
    stdin: {
      contents: source,
      resolveDir: resolveDirectory,
      sourcefile,
      loader: "js",
    },
    bundle: true,
    minify: true,
    format: "esm",
    write: false,
    logLevel: "error",
    external: EXTERNAL,
  });
  const outputFile = result.outputFiles[0];
  if (outputFile === undefined) {
    throw new Error(`esbuild produced no output for ${sourcefile}`);
  }
  return outputFile.contents;
};

const measure = async (name, source, resolveDirectory) => {
  const contents = await bundleSource(source, `${name}.mjs`, resolveDirectory);
  return {
    name,
    bytes: contents.byteLength,
    gzip: gzipSync(contents, { level: 9 }).byteLength,
  };
};

const isRecord = (value) => typeof value === "object" && value !== null;

const isMeasurable = (value) =>
  typeof value === "function" || (typeof value === "object" && value !== null);

const loadExports = async (distributionEntry) => {
  const moduleNamespace = await import(pathToFileURL(distributionEntry).href);
  if (!isRecord(moduleNamespace)) {
    throw new Error(`Unexpected export shape for ${distributionEntry}`);
  }

  const testable = Object.keys(moduleNamespace)
    .filter((name) => isMeasurable(moduleNamespace[name]))
    .sort();

  // Same Radix primitive is re-exported from different component modules
  // (Dialog and Sheet both expose DialogPrimitive.Root). Reference equality
  // would hide the module that actually gets pulled in, so every name is measured.
  return { testable, aliasOf: new Map() };
};

const consumerResolveDirectory = async (packageRoot) => {
  if (packageRoot === rootDirectory) return rootDirectory;

  const consumerDirectory = await mkdtemp(join(tmpdir(), "tree-shaking-"));
  const scope = packageName.startsWith("@")
    ? packageName.slice(0, packageName.indexOf("/"))
    : null;
  await mkdir(
    scope
      ? join(consumerDirectory, "node_modules", scope)
      : join(consumerDirectory, "node_modules"),
    { recursive: true },
  );
  await symlink(packageRoot, join(consumerDirectory, "node_modules", packageName));
  return consumerDirectory;
};

const importSource = (names) =>
  `import { ${names.join(", ")} } from "${packageName}";\nglobalThis.__keep = [${names.join(", ")}];\n`;

const measureExports = async (packageRoot) => {
  const distributionEntry = resolve(packageRoot, "dist/index.js");
  if (!existsSync(distributionEntry)) {
    console.error(`Missing ${distributionEntry}. Run \`pnpm run build\` first.`);
    process.exit(COMPARISON_ERROR_EXIT_CODE);
  }

  const { testable, aliasOf } = await loadExports(distributionEntry);
  const resolveDirectory = await consumerResolveDirectory(packageRoot);

  const [full, ...measurements] = await mapWithConcurrency(
    [
      { name: FULL_IMPORT_KEY, names: testable },
      ...testable.map((name) => ({ name, names: [name] })),
    ],
    CONCURRENCY,
    ({ name, names }) => measure(name, importSource(names), resolveDirectory),
  );

  if (full === undefined) {
    throw new Error("No measurements produced");
  }

  const exportsMap = Object.fromEntries(
    measurements.map((measurement) => [
      measurement.name,
      { bytes: measurement.bytes, gzip: measurement.gzip },
    ]),
  );
  for (const [alias, target] of aliasOf) {
    const targetMeasurement = exportsMap[target];
    if (targetMeasurement !== undefined) exportsMap[alias] = targetMeasurement;
  }

  return {
    full: { bytes: full.bytes, gzip: full.gzip },
    exports: exportsMap,
    aliasOf,
    resolveDirectory,
  };
};

const measureNames = async (names, resolveDirectory) => {
  if (names.length === 0) return { bytes: 0, gzip: 0 };
  const { bytes, gzip } = await measure(
    "__existing__",
    importSource(names),
    resolveDirectory,
  );
  return { bytes, gzip };
};

const readStylesheet = (packageRoot) => {
  const stylesheet = resolve(packageRoot, "dist/styles.css");
  if (!existsSync(stylesheet)) return null;
  const contents = readFileSync(stylesheet);
  return {
    bytes: contents.byteLength,
    gzip: gzipSync(contents, { level: 9 }).byteLength,
  };
};

const printTable = (full, exportsMap, aliasOf, stylesheet) => {
  const rows = Object.entries(exportsMap).sort(([, a], [, b]) => b.bytes - a.bytes);
  console.log(`${"name".padEnd(30)}${"bytes".padStart(9)}${"gzip".padStart(9)}  alias`);
  for (const [name, measurement] of rows) {
    const alias = aliasOf.get(name) ?? "-";
    console.log(
      `${name.padEnd(30)}${String(measurement.bytes).padStart(9)}${String(measurement.gzip).padStart(9)}  ${alias}`,
    );
  }
  console.log(
    `\n${rows.length} exports. Full import: ${full.bytes} B (gzip ${full.gzip} B).`,
  );
  if (stylesheet) {
    console.log(
      `styles.css: ${stylesheet.bytes} B (gzip ${stylesheet.gzip} B). Imported separately; not part of the regression check.`,
    );
  }
};

const compareSnapshots = (base, head, existing) => {
  const names = new Set([...Object.keys(base.exports), ...Object.keys(head.exports)]);
  const changed = [];
  const added = [];
  const removed = [];

  for (const name of [...names].sort()) {
    const baseMeasurement = base.exports[name];
    const headMeasurement = head.exports[name];
    if (baseMeasurement === undefined) {
      if (headMeasurement === undefined) continue;
      added.push({ name, ...headMeasurement });
      continue;
    }
    if (headMeasurement === undefined) {
      removed.push({ name, ...baseMeasurement });
      continue;
    }

    const deltaBytes = headMeasurement.bytes - baseMeasurement.bytes;
    const deltaPercent =
      baseMeasurement.bytes === 0 ? 0 : deltaBytes / baseMeasurement.bytes;
    const row = {
      name,
      base: baseMeasurement,
      head: headMeasurement,
      deltaBytes,
      deltaPercent,
    };
    if (deltaBytes !== 0) changed.push(row);
  }

  changed.sort((a, b) => Math.abs(b.deltaBytes) - Math.abs(a.deltaBytes));

  const baseExisting = base.surviving ?? base.full;
  const fullDeltaBytes = existing.bytes - baseExisting.bytes;
  const fullDeltaPercent =
    baseExisting.bytes === 0 ? 0 : fullDeltaBytes / baseExisting.bytes;

  const regressions = changed.filter(
    (row) =>
      row.deltaBytes > REGRESSION_BYTES_THRESHOLD &&
      row.deltaPercent > REGRESSION_PERCENT_THRESHOLD,
  );
  const fullImportRegressed = fullDeltaPercent > FULL_IMPORT_PERCENT_THRESHOLD;

  return {
    changed,
    added,
    removed,
    fullDeltaBytes,
    fullDeltaPercent,
    regressions,
    fullImportRegressed,
  };
};

const formatPercent = (value) =>
  `${value >= 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;

const formatBytes = (bytes) =>
  Math.abs(bytes) < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

const formatDelta = (bytes, percent) => {
  if (bytes === 0) return "0 B";
  const sign = bytes > 0 ? "+" : "-";
  return `${sign}${formatBytes(Math.abs(bytes))} (${formatPercent(percent)})`;
};

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

const formatCount = (value) => (value > 0 ? `+${value}` : String(value));

const MAX_VISIBLE_ROWS = 20;

const renderTable = (header, rows) => [
  `| ${header.join(" | ")} |`,
  `| ${header.map((_column, index) => (index === 0 ? "---" : "---:")).join(" | ")} |`,
  ...rows,
];

const renderCollapsed = (title, header, rows) => {
  if (rows.length === 0) return [];
  return [
    `<details><summary>${title}</summary>`,
    "",
    ...renderTable(header, rows),
    "",
    "</details>",
    "",
  ];
};

const renderRows = (title, header, rows) => {
  if (rows.length === 0) return [];
  const visible = rows.slice(0, MAX_VISIBLE_ROWS);
  const hidden = rows.slice(MAX_VISIBLE_ROWS);
  const lines = [`### ${title} (${rows.length})`, "", ...renderTable(header, visible), ""];
  if (hidden.length > 0) {
    lines.push(...renderCollapsed(`Show the other ${hidden.length}`, header, hidden));
  }
  return lines;
};

const EXPORT_COLUMNS = ["Export", "Base", "Head", "Δ", "gzip"];

const formatRowDelta = (base, head) => {
  if (base === null) return "new";
  if (head === null) return "removed";
  const deltaBytes = head.bytes - base.bytes;
  return formatDelta(deltaBytes, base.bytes === 0 ? 0 : deltaBytes / base.bytes);
};

const renderExportRow = (marker, name, base, head) => {
  const baseSize = base === null ? "—" : formatBytes(base.bytes);
  const headSize = head === null ? "—" : formatBytes(head.bytes);
  const gzip = formatBytes((head ?? base)?.gzip ?? 0);
  return `| ${marker} \`${name}\` | ${baseSize} | ${headSize} | ${formatRowDelta(base, head)} | ${gzip} |`;
};

const changeMarker = (row, result) => {
  if (result.regressions.includes(row)) return "🔴";
  return row.deltaBytes > 0 ? "🟡" : "🟢";
};

const allExportsMarker = (row, base, head, result) => {
  if (row !== undefined) return changeMarker(row, result);
  if (base === undefined) return "🆕";
  return head === undefined ? "🗑️" : "⚪";
};

const describeCounts = (result) => {
  const grown = result.changed.filter((row) => row.deltaBytes > 0).length;
  const shrunk = result.changed.length - grown;
  return [
    grown > 0 ? `${grown} grew` : "",
    shrunk > 0 ? `${shrunk} shrank` : "",
    result.added.length > 0 ? `${result.added.length} new` : "",
    result.removed.length > 0 ? `${result.removed.length} removed` : "",
  ]
    .filter((part) => part !== "")
    .join(", ");
};

const renderMarkdown = (base, head, existing, result, stylesheet) => {
  const measured = Object.keys(head.exports).length;
  const regressionCount =
    result.regressions.length + (result.fullImportRegressed ? 1 : 0);
  const noImpact =
    result.changed.length === 0 &&
    result.added.length === 0 &&
    result.removed.length === 0 &&
    result.fullDeltaBytes === 0;

  const lines = ["## Tree-shaking report", ""];

  if (noImpact) {
    lines.push(
      `✅ **No bundle size impact.** All ${measured} exports are the same size as on the base branch (full import ${formatBytes(head.full.bytes)}, gzip ${formatBytes(head.full.gzip)}).`,
      "",
    );
  } else {
    const status =
      regressionCount === 0
        ? "✅ **No size regression.**"
        : `❌ **${plural(regressionCount, "size regression")}.**`;
    const counts = describeCounts(result);
    const scope =
      counts === "" ? `${measured} exports measured` : `${counts} out of ${measured} exports`;
    const changedRows = [
      ...result.changed.map((row) => ({
        name: row.name,
        weight: Math.abs(row.deltaBytes),
        line: renderExportRow(changeMarker(row, result), row.name, row.base, row.head),
      })),
      ...result.added.map((item) => ({
        name: item.name,
        weight: item.bytes,
        line: renderExportRow("🆕", item.name, null, item),
      })),
      ...result.removed.map((item) => ({
        name: item.name,
        weight: item.bytes,
        line: renderExportRow("🗑️", item.name, item, null),
      })),
    ]
      .sort((a, b) => b.weight - a.weight || a.name.localeCompare(b.name))
      .map((item) => item.line);
    lines.push(
      `${status} ${scope}.`,
      "",
      "| | Base | Head | Δ |",
      "| --- | ---: | ---: | ---: |",
      `| Pre-existing exports, all imported | ${formatBytes((base.surviving ?? base.full).bytes)} | ${formatBytes(existing.bytes)} (gzip ${formatBytes(existing.gzip)}) | ${result.fullImportRegressed ? "🔴 " : ""}${formatDelta(result.fullDeltaBytes, result.fullDeltaPercent)} |`,
      `| Full import | ${formatBytes(base.full.bytes)} | ${formatBytes(head.full.bytes)} (gzip ${formatBytes(head.full.gzip)}) | ${formatRowDelta(base.full, head.full)} |`,
      `| Exports | ${Object.keys(base.exports).length} | ${measured} | ${formatCount(measured - Object.keys(base.exports).length)} |`,
      "",
      ...renderRows("What changed", EXPORT_COLUMNS, changedRows),
    );
  }

  const everyName = [
    ...new Set([...Object.keys(base.exports), ...Object.keys(head.exports)]),
  ].sort();
  const changedByName = new Map(result.changed.map((row) => [row.name, row]));
  lines.push(
    ...renderCollapsed(
      `All exports (${everyName.length})`,
      EXPORT_COLUMNS,
      everyName.map((name) => {
        const row = changedByName.get(name);
        const baseMeasurement = base.exports[name];
        const headMeasurement = head.exports[name];
        const marker = allExportsMarker(row, baseMeasurement, headMeasurement, result);
        return renderExportRow(
          marker,
          name,
          baseMeasurement ?? null,
          headMeasurement ?? null,
        );
      }),
    ),
    "<details><summary>How this is measured</summary>",
    "",
    "Every export is imported alone into an esbuild consumer bundle (minified, tree-shaken) built from the head and from the base of this pull request; the sizes are the resulting bundles, gzip is their gzipped size. " +
      `react, react-dom and react/jsx-runtime stay outside the bundle. ` +
      `🔴 marks a regression: a pre-existing export that grew more than ${REGRESSION_PERCENT_THRESHOLD * 100}% and more than ${REGRESSION_BYTES_THRESHOLD} B, or the bundle importing every pre-existing export growing more than ${FULL_IMPORT_PERCENT_THRESHOLD * 100}%. ` +
      "🟡 is growth under the threshold, 🟢 a decrease, ⚪ no change, 🆕 an export that does not exist on the base (never a regression), 🗑️ an export that was removed. An intentional increase is accepted with the `tree-shaking: accepted` label.",
    "",
    stylesheet
      ? `\`styles.css\` is ${formatBytes(stylesheet.bytes)} (gzip ${formatBytes(stylesheet.gzip)}) on this build. It is imported separately and is not part of the regression check.`
      : "",
    "",
    "Adapted from the tree-shaking report by Hyan Mandian (brazilian-utils), MIT.",
    "",
    "</details>",
  );

  return lines.filter((line, index, all) => !(line === "" && all[index - 1] === "")).join("\n");
};

const isMeasurement = (value) =>
  typeof value === "object" &&
  value !== null &&
  "bytes" in value &&
  typeof value.bytes === "number" &&
  "gzip" in value &&
  typeof value.gzip === "number";

const isSnapshot = (value) =>
  typeof value === "object" &&
  value !== null &&
  "full" in value &&
  isMeasurement(value.full) &&
  "exports" in value &&
  isRecord(value.exports) &&
  (!("surviving" in value) ||
    value.surviving === undefined ||
    isMeasurement(value.surviving)) &&
  Object.values(value.exports).every((entry) => isMeasurement(entry));

const readSnapshot = async (filePath) => {
  const parsed = JSON.parse(await readFile(filePath, "utf8"));
  if (!isSnapshot(parsed)) {
    throw new Error(`${filePath} is not a valid tree-shaking snapshot`);
  }
  return parsed;
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  const packageRoot =
    args.dist === undefined || args.dist === ""
      ? rootDirectory
      : resolve(process.cwd(), args.dist);

  const {
    full,
    exports: exportsMap,
    aliasOf,
    resolveDirectory,
  } = await measureExports(packageRoot);
  const stylesheet = readStylesheet(packageRoot);

  if (args.json !== undefined && args.json !== "") {
    const snapshot = { full, exports: exportsMap };

    if (args.surviving !== undefined && args.surviving !== "") {
      const other = await readSnapshot(resolve(process.cwd(), args.surviving));
      const survivingNames = Object.keys(exportsMap)
        .filter((name) => name in other.exports && !aliasOf.has(name))
        .sort();
      snapshot.surviving = await measureNames(survivingNames, resolveDirectory);
    }

    await writeFile(
      resolve(process.cwd(), args.json),
      `${JSON.stringify(snapshot, null, "\t")}\n`,
    );
  }

  if (args.compare !== undefined && args.compare !== "") {
    const base = await readSnapshot(resolve(process.cwd(), args.compare));
    const head = { full, exports: exportsMap };
    const existingNames = Object.keys(base.exports)
      .filter((name) => name in exportsMap && !aliasOf.has(name))
      .sort();
    const existing = await measureNames(existingNames, resolveDirectory);
    const result = compareSnapshots(base, head, existing);
    const markdown = renderMarkdown(base, head, existing, result, stylesheet);

    console.log(markdown);
    if (args.markdown !== undefined && args.markdown !== "") {
      await writeFile(resolve(process.cwd(), args.markdown), `${markdown}\n`);
    }

    if (result.regressions.length > 0 || result.fullImportRegressed) {
      console.error(
        `\n${result.regressions.length} export regression(s)` +
          `${result.fullImportRegressed ? ", full-import bundle regressed" : ""}.`,
      );
      process.exit(1);
    }
    return;
  }

  printTable(full, exportsMap, aliasOf, stylesheet);
};

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(COMPARISON_ERROR_EXIT_CODE);
}
