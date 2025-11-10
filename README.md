# Skills MCP Server

The Skills MCP Server distributes Python and TypeScript sync scripts that consolidate SKILL.md content from designated repositories. It follows the Model Context Protocol (MCP) resource pattern so agents download and execute scripts locally while the server remains stateless.

## Overview

- Provides three MCP resources (Python script, TypeScript script, repository guide), two prompts, and one tool.
- Reads repository URLs from `.skills/repos.txt`, clones/pulls the sources, and rewrites `AGENTS.md` with the merged skill catalog.
- Ships precompiled assets under `dist/`; no runtime build step is required for users.

## Installation

1. **Install once via tarball (recommended)**
   ```
   npm install -g https://codeload.github.com/sfc-gh-dflippo/skills-mcp-server/tar.gz/refs/heads/main
   ```
2. **Configure your MCP client**
   ```
   {
     "mcpServers": {
       "skills": {
         "command": "/opt/homebrew/bin/skills-mcp-server"
       }
     }
   }
   ```
   Replace the command path if your global npm prefix differs; `npm prefix -g` returns the correct base directory.
3. **Optional fallback**  
   `npx -y github:sfc-gh-dflippo/skills-mcp-server` remains available for ad‑hoc use. Expect slower start-up because npm re-downloads the repository for each invocation.

### Installation issues

- **Binary not found**: add `<npm prefix -g>/bin` to `PATH`, or reference the absolute binary path in client configuration.
- **Stale git install**: uninstall and reinstall using the tarball command above. Pure `github:` installs leave temporary symlinks that expire.
- **Cleaning up**:
  ```
  npm uninstall -g @sfc-gh-dflippo/skills-mcp-server
  npm cache clean --force
  ```

## Usage

1. Maintain `.skills/repos.txt` with one repository URL per line.
2. Ask your assistant to run `/skills/sync-skills` (Cursor) or via natural text, "Please sync my skill repositories".
3. The agent downloads the preferred script, executes it locally, and updates `AGENTS.md`. Local SKILL.md files override remote entries by design.

### Operating model

1. Agent triggers a sync request.
2. Server returns script content via MCP resources.
3. Agent writes the script to disk and executes it.
4. Script performs shallow clones, evaluates SKILL.md precedence, and rewrites `AGENTS.md`.

This pattern keeps code execution on the client, supports remote MCP deployment, and minimizes context size.

## Development

```bash
git clone https://github.com/sfc-gh-dflippo/skills-mcp-server.git
cd skills-mcp-server
npm install
npm run build
```

Use a local MCP entry while iterating:

```
{
  "mcpServers": {
    "skills-local": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}
```

### Testing

- `npm test` runs the global-install smoke test (tarball install, binary verification, launch check), plus server, TypeScript, and Python suites.
- Individual suites remain available: `npm run test:server`, `npm run test:ts-script`, `npm run test:py-script`.
- First-time Python test setup: `python3 -m venv .venv-test && source .venv-test/bin/activate && pip install -r tests/requirements.txt`.

### Tooling

- `npm run dev` starts FastMCP interactive mode.
- `npm run inspect` opens the MCP Inspector UI at `http://localhost:6274`.
- `npm run clean` removes the compiled `dist/` artifacts.

## Support

- Rebuild assets after local changes: `npm run build`.
- Reset the Python test environment if dependencies drift: recreate `.venv-test` and reinstall requirements.
- For protocol guidance, see the [MCP Specification](https://spec.modelcontextprotocol.io) and Anthropic’s [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp).

## License

Apache-2.0

## Links

- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Anthropic: Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- [Cloudflare: Code Mode](https://blog.cloudflare.com/code-mode/)
