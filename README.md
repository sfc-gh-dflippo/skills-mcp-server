# Skills MCP Server

Manage AI agent skills from GitHub repositories using an MCP server that provides downloadable sync scripts.

## Quick Start

### 1. Configure Repositories

Create or edit `.skills/repos.txt` in your project root with one repository URL per line:

```
https://github.com/anthropics/skills
https://github.com/your-org/custom-skills
```

### 2. Install the MCP Server Once

Install directly from the GitHub repository tarball (no registry publish required):

```bash
npm install -g https://codeload.github.com/sfc-gh-dflippo/skills-mcp-server/tar.gz/refs/heads/main
```

This downloads the repo a single time and reuses the cached `skills-mcp-server` binary on every startup, keeping launch times under two seconds.

Point Cursor (or any client) at the global binary in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "skills": {
      "command": "/opt/homebrew/bin/skills-mcp-server"
    }
  }
}
```

**Need a one-off run instead?**

```bash
npx -y github:sfc-gh-dflippo/skills-mcp-server
```

The `npx` flow still works but redownloads the repo each time and relies on npm’s git install cache (which is slower and less reliable over time), so expect a ~30s cold start.

**Contributor tip:** keep the local dev entry handy if you're iterating:

```json
{
  "mcpServers": {
    "skills-local": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}
```

### Troubleshooting Installation

- **`skills-mcp-server: command not found`**  
  Ensure your global npm bin directory is on `PATH`:

  ```bash
  npm prefix -g
  ```

  Add `<prefix>/bin` to your shell profile if it isn't already, or point tooling at the absolute binary path (`$(npm prefix -g)/bin/skills-mcp-server`).

- **`ENOTDIR: not a directory, rename …/skills-mcp-server`**  
  npm sometimes leaves a partial install in `$(npm prefix -g)/lib/node_modules/@sfc-gh-dflippo`. Remove it before reinstalling:

  ```bash
  npm uninstall -g @sfc-gh-dflippo/skills-mcp-server
  rm -rf "$(npm prefix -g)/lib/node_modules/@sfc-gh-dflippo"
  npm cache clean --force   # optional
  npm install -g github:sfc-gh-dflippo/skills-mcp-server
  ```

- **Slow re-installs**  
  Remove an old install before re-running `npm install -g`:

  ```bash
  npm uninstall -g @sfc-gh-dflippo/skills-mcp-server
  npm cache clean --force
  ```

- **Already installed via `github:` and the binary vanished later?**  
  Reinstall using the tarball URL above. Git installs leave a symlink into npm’s temp cache; the tarball install copies the files into the global prefix so they persist.

- **Do I need a build step?**  
  No. The repo commits the prebuilt `dist/` assets, so `npm install -g github:sfc-gh-dflippo/skills-mcp-server` works without an extra `prepare` script. If you pull fresh changes locally, just run `npm run build` before reinstalling from disk.

### 3. Sync Skills

**Option A: Ask your AI agent**

```
Please sync my skill repositories
```

**Option B: Use the Cursor command**

```
/skills/sync-skills
```

The agent will download and execute a sync script that:

- Clones/pulls repositories from `.skills/repos.txt`
- Scans for `SKILL.md` files (local and remote)
- Updates `AGENTS.md` with your skills catalog
- Uses shallow git clones for minimal storage (~3MB per repo)

## What Are Skills?

Skills are structured instruction sets (SKILL.md files) that enhance AI assistant capabilities for specific domains. Each skill provides:

- Domain-specific knowledge and best practices
- Code templates and examples
- Troubleshooting strategies

**Local skills** (in your project) override remote skills with the same name.

## How It Works

The server provides sync scripts as **MCP resources** (not direct tool calls):

1. **Agent requests sync** via command or prompt
2. **Server provides script** (TypeScript or Python)
3. **Agent downloads and executes** script locally
4. **Script syncs repositories** and updates AGENTS.md

**Why this approach?**

This follows the **resource pattern** recommended in [Anthropic's Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) blog post:

> "Agents can load only the definitions they need for the current task... Progressive disclosure."

Benefits:

- **Security**: Server never executes code
- **Remote-ready**: Works with remote MCP servers
- **Agent control**: Code runs in agent's environment
- **Efficiency**: No script bloat in context windows

## Development & Testing

### Local Development Setup

If you're contributing to the server or need to test changes:

1. **Clone and build:**

   ```bash
   git clone https://github.com/sfc-gh-dflippo/skills-mcp-server.git
   cd skills-mcp-server
   npm install
   npm run build
   ```

2. **Use local build in `.cursor/mcp.json`:**
   ```json
   {
     "mcpServers": {
       "skills": {
         "command": "node",
         "args": ["dist/index.js"]
       }
     }
   }
   ```
   **Note:** Path is relative to workspace root (where `.cursor/` folder is).

### Running Tests

```bash
# Run all tests (34 total, ~3 seconds)
npm test

# Individual test suites
npm run test:server      # MCP server tests (16 tests)
npm run test:ts-script   # TypeScript script tests (11 tests)
npm run test:py-script   # Python script tests (7 tests)
```

**Test Coverage:**

- ✅ Server resources, prompts, and tools (100%)
- ✅ Script structure and syntax validation (100%)
- ✅ Script compilation (TypeScript → JavaScript, Python bytecode)

### Interactive Development

**FastMCP Dev Mode** - Interactive CLI testing:

```bash
npm run dev
```

**MCP Inspector** - Visual web UI at `http://localhost:6274`:

```bash
npm run inspect
```

### Python Test Setup (First Time)

```bash
python3 -m venv .venv-test
source .venv-test/bin/activate
pip install -r tests/requirements.txt
```

### Troubleshooting

**"Module not found" errors:**

```bash
npm run build  # Rebuild dist/ directory
```

**Python tests fail:**

```bash
rm -rf .venv-test
python3 -m venv .venv-test
source .venv-test/bin/activate
pip install -r tests/requirements.txt
```

## License

Apache-2.0

## Links

- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Anthropic: Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- [Cloudflare: Code Mode](https://blog.cloudflare.com/code-mode/)
