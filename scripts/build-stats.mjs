import { readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const distDir = resolve(root, "dist");
const trackedExtensions = new Set([".css", ".html", ".js"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(path);
      }

      if (!trackedExtensions.has(extname(entry.name))) {
        return [];
      }

      return [path];
    })
  );

  return files.flat();
}

function formatBytes(bytes) {
  return `${(bytes / 1000).toFixed(2)} kB`;
}

const distStats = await stat(distDir).catch(() => null);

if (!distStats?.isDirectory()) {
  throw new Error("Missing dist/. Run npm run build before collecting build stats.");
}

const files = await collectFiles(distDir);
const rows = files
  .map((file) => {
    const content = readFileSync(file);

    return {
      file: relative(root, file).replaceAll("\\", "/"),
      rawBytes: content.byteLength,
      gzipBytes: gzipSync(content).byteLength
    };
  })
  .sort((a, b) => b.rawBytes - a.rawBytes);

const totals = rows.reduce(
  (summary, row) => ({
    rawBytes: summary.rawBytes + row.rawBytes,
    gzipBytes: summary.gzipBytes + row.gzipBytes
  }),
  { rawBytes: 0, gzipBytes: 0 }
);

console.log("Production build stats");
console.log("======================");

for (const row of rows) {
  console.log(`${row.file}  raw ${formatBytes(row.rawBytes)}  gzip ${formatBytes(row.gzipBytes)}`);
}

console.log("----------------------");
console.log(`total  raw ${formatBytes(totals.rawBytes)}  gzip ${formatBytes(totals.gzipBytes)}`);
