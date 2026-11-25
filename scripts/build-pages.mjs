#!/usr/bin/env node
/**
 * GitHub Pages static export.
 * API routes cannot ship on Pages — park them for the build, then restore.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const api = join(root, "src/app/api");
const parked = join(root, ".pages-park/api");

function park() {
  if (!existsSync(api)) return;
  mkdirSync(dirname(parked), { recursive: true });
  if (existsSync(parked)) rmSync(parked, { recursive: true, force: true });
  renameSync(api, parked);
}

function restore() {
  if (!existsSync(parked)) return;
  if (existsSync(api)) rmSync(api, { recursive: true, force: true });
  renameSync(parked, api);
  try {
    rmSync(join(root, ".pages-park"), { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

park();
try {
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true" },
  });
} finally {
  restore();
}
