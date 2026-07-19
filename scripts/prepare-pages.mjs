import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const pagesDir = resolve(root, "pages-dist");
const requiredOutputs = [
  ["dist/index.html", "dashboard build"],
  ["dist/user-guide/index.html", "User Guide build"],
  ["dist/engineering/index.html", "Engineering Guide build"],
  ["coverage/index.html", "coverage report"],
  ["docs/index.html", "TypeDoc documentation"]
];

for (const [path, label] of requiredOutputs) {
  if (!existsSync(resolve(root, path))) {
    throw new Error(`Missing ${label} at ${path}. Run the matching build step first.`);
  }
}

await rm(pagesDir, { force: true, recursive: true });
await mkdir(pagesDir, { recursive: true });
await cp(resolve(root, "dist"), pagesDir, { recursive: true });
await cp(resolve(root, "coverage"), resolve(pagesDir, "coverage"), { recursive: true });
await cp(resolve(root, "docs"), resolve(pagesDir, "docs"), { recursive: true });
await writeFile(resolve(pagesDir, ".nojekyll"), "");
