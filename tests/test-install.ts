#!/usr/bin/env tsx
/**
 * Validates that the package can be installed globally from the Git repository.
 *
 * Strategy:
 *  - Install with `npm install -g github:sfc-gh-dflippo/skills-mcp-server`
 *    into a temporary npm prefix (no sudo required, leaves global env untouched).
 *  - Assert the binary exists in the generated bin folder.
 *  - Assert the dist assets are present in node_modules.
 *  - Spawn the binary and wait for the startup banner to ensure it actually runs.
 */

import { execSync, spawn } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const REPO_SPEC = "https://codeload.github.com/sfc-gh-dflippo/skills-mcp-server/tar.gz/refs/heads/main";
const STARTUP_MARKER = "[SkillsMCPServer] Started";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function findFirstExisting(paths: string[]): string | undefined {
  return paths.find((candidate) => fs.existsSync(candidate));
}

async function verifyBinaryLaunch(binPath: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(binPath, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stderrBuffer = "";
    let started = false;
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`Timed out waiting for startup message. stderr:\n${stderrBuffer}`));
    }, 15_000);

    child.stderr.setEncoding("utf-8");
    child.stderr.on("data", (chunk: string) => {
      stderrBuffer += chunk;
      if (!started && stderrBuffer.includes(STARTUP_MARKER)) {
        started = true;
        clearTimeout(timeout);
        child.kill();
      }
    });

    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    child.on("exit", (code, signal) => {
      clearTimeout(timeout);
      if (started) {
        resolve();
      } else {
        reject(new Error(`Server exited before startup (code=${code}, signal=${signal}). stderr:\n${stderrBuffer}`));
      }
    });
  });
}

async function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-mcp-install-"));
  const prefix = path.join(tmpDir, "prefix");
  fs.mkdirSync(prefix, { recursive: true });

  console.log(`\n🧪 Installing ${REPO_SPEC} into isolated prefix ${prefix}`);
  execSync(`npm install -g ${REPO_SPEC}`, {
    env: {
      ...process.env,
      npm_config_prefix: prefix,
      NPM_CONFIG_PREFIX: prefix,
    },
    stdio: "inherit",
  });

  const binCandidates =
    process.platform === "win32"
      ? [path.join(prefix, "bin", "skills-mcp-server.cmd"), path.join(prefix, "Scripts", "skills-mcp-server.cmd")]
      : [path.join(prefix, "bin", "skills-mcp-server"), path.join(prefix, "lib", "node_modules", ".bin", "skills-mcp-server")];

  const binPath = findFirstExisting(binCandidates);
  assert(binPath, `skills-mcp-server binary not found in candidates: ${binCandidates.join(", ")}`);
  console.log(`✅ Binary located at ${binPath}`);

  const installRootCandidates = [
    path.join(prefix, "lib", "node_modules", "@sfc-gh-dflippo", "skills-mcp-server"),
    path.join(prefix, "node_modules", "@sfc-gh-dflippo", "skills-mcp-server"),
  ];

  const installRoot = findFirstExisting(installRootCandidates);
  assert(installRoot, `Could not find installed package root. Checked: ${installRootCandidates.join(", ")}`);

  const distIndex = path.join(installRoot, "dist", "index.js");
  assert(fs.existsSync(distIndex), `dist/index.js missing at ${distIndex}`);
  const distResources = path.join(installRoot, "dist", "resources", "sync-skills.py");
  assert(fs.existsSync(distResources), `dist/resources/sync-skills.py missing at ${distResources}`);
  console.log("✅ dist assets present");

  await verifyBinaryLaunch(binPath);
  console.log("✅ Binary launches and emits startup banner");

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("🧹 Temporary install cleaned up\n");
}

main().catch((error) => {
  console.error("\n💥 Global install test failed:", error);
  process.exit(1);
});
