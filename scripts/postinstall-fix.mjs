#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  lstatSync,
  realpathSync,
  rmSync,
  renameSync,
} from "fs";
import path from "path";

const DEBUG = Boolean(process.env.SKILLS_MCP_DEBUG_INSTALL);

function log(message) {
  if (DEBUG) {
    console.error(`[skills-mcp-server:postinstall] ${message}`);
  }
}

function defaultPrefix() {
  if (process.platform === "win32") {
    const appData = process.env.APPDATA;
    if (appData) {
      return path.join(appData, "npm");
    }
    return path.dirname(process.execPath);
  }
  return path.dirname(path.dirname(process.execPath));
}

function findNodeModulesDir(prefix) {
  const candidates =
    process.platform === "win32"
      ? [path.join(prefix, "node_modules")]
      : [
          path.join(prefix, "lib", "node_modules"),
          path.join(prefix, "node_modules"),
        ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

function main() {
  const prefixCandidates = [
    process.env.npm_config_prefix,
    process.env.npm_config_global_prefix,
    process.env.npm_prefix,
    process.env.PREFIX,
    process.env.npm_config_local_prefix,
    defaultPrefix(),
  ].filter(Boolean);

  if (DEBUG) {
    log(`Prefix candidates: ${prefixCandidates.join(", ")}`);
  }

  let nodeModulesDir;
  for (const prefix of prefixCandidates) {
    nodeModulesDir = findNodeModulesDir(prefix);
    if (nodeModulesDir) {
      if (DEBUG) {
        log(`Using prefix ${prefix}, node_modules at ${nodeModulesDir}`);
      }
      break;
    }
  }

  if (!nodeModulesDir) {
    log(
      "Could not locate node_modules directory from any prefix candidate; skipping.",
    );
    return;
  }

  const packageDir = path.join(
    nodeModulesDir,
    "@sfc-gh-dflippo",
    "skills-mcp-server",
  );
  if (!existsSync(packageDir)) {
    log(`Package directory ${packageDir} does not exist yet; skipping.`);
    return;
  }

  let stats;
  try {
    stats = lstatSync(packageDir);
  } catch (error) {
    log(`Failed to stat ${packageDir}: ${error.message}`);
    return;
  }

  if (!stats.isSymbolicLink()) {
    log(`Package directory ${packageDir} is not a symlink; nothing to do.`);
    return;
  }

  let realPackageDir;
  try {
    realPackageDir = realpathSync(packageDir);
  } catch (error) {
    log(`Failed to resolve realpath for ${packageDir}: ${error.message}`);
    return;
  }

  if (
    !realPackageDir.includes(
      `${path.sep}.npm${path.sep}_cacache${path.sep}tmp${path.sep}git-clone`,
    )
  ) {
    log(
      `Resolved path ${realPackageDir} is not a temporary git clone; skipping.`,
    );
    return;
  }

  const tempCopyDir = `${packageDir}-tmp-copy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  log(`Copying package from ${realPackageDir} to ${tempCopyDir}`);
  cpSync(realPackageDir, tempCopyDir, { recursive: true });

  log(`Replacing symlink ${packageDir} with physical directory`);
  rmSync(packageDir, { recursive: true, force: true });
  renameSync(tempCopyDir, packageDir);

  log("Postinstall copy completed successfully");
}

try {
  main();
} catch (error) {
  log(`Postinstall fix failed: ${error.stack || error.message}`);
  // Do not block install even if the fix fails.
}
