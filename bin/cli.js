#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "socratic-mentor";
const SKILL_DIRNAME = "socratic-mentor";
const SKILL_FILENAME = "SKILL.md";

function log(...args) {
  console.log("\x1b[36m[socratic-mentor]\x1b[0m", ...args);
}

function error(...args) {
  console.error("\x1b[31m[socratic-mentor]\x1b[0m", ...args);
  process.exit(1);
}

// ── Resolve source ──────────────────────────────────────────────

// npm global install: the package lives in a global node_modules
// npm local install: the package lives in ./node_modules/socratic-mentor
function findPkgRoot() {
  // __dirname is bin/, so package root is one level up
  return path.resolve(__dirname, "..");
}

function findSkillSource() {
  const fromPkg = path.join(findPkgRoot(), "skills", SKILL_DIRNAME, SKILL_FILENAME);
  if (fs.existsSync(fromPkg)) return fromPkg;

  // Fallback: npx might have extracted to a temp dir
  const fromCwd = path.join(process.cwd(), "skills", SKILL_DIRNAME, SKILL_FILENAME);
  if (fs.existsSync(fromCwd)) return fromCwd;

  error(
    "Cannot find skill source. Expected at:\n" +
      `  ${fromPkg}\n` +
      `  ${fromCwd}`
  );
}

// ── Resolve target ──────────────────────────────────────────────

function resolveTargetDir(scope) {
  if (scope === "global") {
    return path.join(os.homedir(), ".claude", "skills", SKILL_DIRNAME);
  }
  // project-local
  return path.join(process.cwd(), ".claude", "skills", SKILL_DIRNAME);
}

// ── Install ─────────────────────────────────────────────────────

function install(scope) {
  const src = findSkillSource();
  const destDir = resolveTargetDir(scope);
  const dest = path.join(destDir, SKILL_FILENAME);

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);

  log(`Installed ${scope === "global" ? "globally" : "to this project"}`);
  log(`  ${dest}`);

  return destDir;
}

// ── Activation prompt ───────────────────────────────────────────

function promptActivation(scope) {
  const destDir = resolveTargetDir(scope);

  if (scope === "global") {
    log("");
    log("The skill is installed globally. It will be available in all projects,");
    log("but stays silent until learning intent is detected.");
    log("");
    log("To auto-activate in a specific project, add this to its CLAUDE.md:");
    log("");
    log("  \x1b[33m## Learning Mode\x1b[0m");
    log("  \x1b[33mThis project uses socratic-mentor for guided learning.\x1b[0m");
    return;
  }

  // Project install: offer to write CLAUDE.md activation
  log("");
  log("Skill installed. For auto-activation on project entry, add to CLAUDE.md:");
  log("");
  log("  \x1b[33m## Learning Mode\x1b[0m");
  log("  \x1b[33mThis project uses socratic-mentor for guided learning.\x1b[0m");
}

// ── Main ────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
  socratic-mentor — Socratic learning tutor for Claude Code

  Usage:
    npm install -g socratic-mentor       # global install
    npx socratic-mentor                  # one-shot project install
    npm install --save-dev socratic-mentor  # project dev dependency

  Options:
    --global     Force global install
    --local      Force project-local install (default with npx)
    --help, -h   Show this help
`);
    process.exit(0);
  }

  const scope =
    args.includes("--global") || args.includes("-g") ? "global" : "local";

  const destDir = install(scope);
  promptActivation(scope);

  log("");
  log("\x1b[32mDone!\x1b[0m Just say \x1b[33m\"学习模式\"\x1b[0m to start learning.");
}

main();
