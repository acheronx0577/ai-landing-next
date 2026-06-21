#!/usr/bin/env node
/**
 * Push deployment env vars to Vercel (CLI) and Convex (CLI).
 *
 * Usage:
 *   node scripts/push-env.mjs              # Vercel + Convex prod
 *   node scripts/push-env.mjs --vercel-only
 *   node scripts/push-env.mjs --convex-only
 *   node scripts/push-env.mjs --convex-only --convex-dev
 *
 * Reads from .env.deploy.local (copy from .env.deploy.example).
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_FILE = resolve(ROOT, ".env.deploy.local");

const VERCEL_KEYS = [
  "NEXT_PUBLIC_CONVEX_URL",
  "NEXT_PUBLIC_CONVEX_SITE_URL",
  "CONVEX_DEPLOYMENT",
  "CONVEX_DEPLOY_KEY",
];

const CONVEX_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
];

const VERCEL_TARGETS = ["production", "preview", "development"];

function parseEnvFile(path) {
  const vars = {};

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value) {
      vars[key] = value;
    }
  }

  return vars;
}

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { cwd: ROOT, stdio: "inherit", env: process.env });
}

function pushVercel(vars) {
  const entries = VERCEL_KEYS.filter((key) => vars[key]);
  if (entries.length === 0) {
    console.log("No Vercel env vars found in .env.deploy.local — skipping.");
    return;
  }

  for (const target of VERCEL_TARGETS) {
    for (const key of entries) {
      const value = vars[key].replace(/"/g, '\\"');
      run(
        `vercel env add ${key} ${target} --value "${value}" --yes --force`,
      );
    }
  }

  console.log("\nVercel env vars pushed (production, preview, development).");
}

function pushConvex(vars, useDev) {
  const entries = CONVEX_KEYS.filter((key) => vars[key]);
  if (entries.length === 0) {
    console.log("No Convex env vars found in .env.deploy.local — skipping.");
    return;
  }

  const prodFlag = useDev ? "" : " --prod";

  for (const key of entries) {
    const value = vars[key].replace(/"/g, '\\"');
    run(`npx convex env set ${key} "${value}"${prodFlag}`);
  }

  console.log(
    `\nConvex env vars pushed (${useDev ? "dev deployment" : "production deployment"}).`,
  );
}

const args = process.argv.slice(2);
const vercelOnly = args.includes("--vercel-only");
const convexOnly = args.includes("--convex-only");
const convexDev = args.includes("--convex-dev");

if (!existsSync(ENV_FILE)) {
  console.error(
    "Missing .env.deploy.local — copy .env.deploy.example and fill in your values.",
  );
  process.exit(1);
}

const vars = parseEnvFile(ENV_FILE);

if (!vercelOnly && !convexOnly) {
  pushVercel(vars);
  pushConvex(vars, convexDev);
} else if (vercelOnly) {
  pushVercel(vars);
} else if (convexOnly) {
  pushConvex(vars, convexDev);
}

console.log("\nDone.");
