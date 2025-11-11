# AI Agent Configuration

Context and guidelines for AI coding agents working on the Skills MCP Server project.

## Tech Stack

### Core Technologies

- **Node.js**: v18+ (managed via `.nvmrc`)
- **TypeScript**: Strict type checking enabled with comprehensive compiler options
- **Python**: 3.11+ (managed via `.python-version`)
- **MCP (Model Context Protocol)**: FastMCP framework for building MCP servers

### Development Tools

#### TypeScript/JavaScript

- **Build**: `tsc` (TypeScript compiler)
- **Linting**: ESLint with `typescript-eslint` plugin
- **Formatting**: Prettier
- **Testing**: Custom test framework with `tsx`
- **Package Manager**: npm

#### Python

- **Type Checking**: `basedpyright` with standard type checking level
- **Linting & Formatting**: `ruff` (fast Python linter and formatter)
- **Testing**: `pytest` with `pytest-xdist` for parallel execution
- **Package Management**: pip with `requirements-dev.txt`

#### Quality Assurance

- **Pre-commit Hooks**: Automated checks for code quality, formatting, and security
- **Git Hooks**: Trailing whitespace, YAML/JSON/TOML validation, secret scanning (Entro)

### Project Structure

```
skills-mcp-server/
├── src/                          # TypeScript source code
│   ├── index.ts                  # MCP server implementation
│   └── resources/                # Sync scripts (Python & TypeScript)
├── dist/                         # Compiled TypeScript output (committed for npx)
├── tests/                        # Test suites (TypeScript & Python)
├── .skills/                      # Skills management
│   ├── repos.txt                 # Repository configuration
│   └── repositories/             # Cloned skill repos (gitignored)
├── pyproject.toml                # Python configuration (centralized)
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Node.js dependencies and scripts
├── requirements-dev.txt          # Python dev dependencies
├── .pre-commit-config.yaml       # Pre-commit hook configuration
└── Makefile                      # Common development tasks
```

## Development Best Practices

### Code Quality Standards

#### TypeScript

- **Strict Type Checking**: All strict compiler options enabled
- **No Implicit Any**: All parameters and return types must be explicitly typed
- **Null Safety**: Strict null checks with proper handling of undefined values
- **No Unused Variables**: Clean code with no unused locals or parameters
- **Index Access Safety**: Use `noUncheckedIndexedAccess` for array/object safety

#### Python

- **Type Hints Required**: All functions must have complete type annotations
- **Modern Path Handling**: Use `pathlib.Path` instead of `os.path`
- **Explicit Operations**: No implicit string concatenation
- **Return Value Handling**: Assign unused return values to `_`
- **Import Organization**: Group imports logically (stdlib, third-party, local)

### Testing Strategy

#### Parallel Execution

- **Python**: `pytest -n auto` (uses all CPU cores)
- **TypeScript**: `npm-run-all --parallel` for concurrent test suites

#### Test Organization

- **Unit Tests**: Test individual functions and modules
- **Integration Tests**: Test MCP server functionality end-to-end
- **Script Tests**: Validate sync script structure and execution

#### Coverage Goals

- Maintain high test coverage for critical paths
- Use `pytest-cov` for Python coverage reporting
- Test both success and error scenarios

### Development Workflow

#### Setup

```bash
# Install Node.js dependencies
npm install

# Install Python dev dependencies
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install
```

#### Common Commands

```bash
# Run all tests (parallel)
npm test

# Run tests serially (for debugging)
npm run test-serial

# Lint and format
make lint
make format

# Type checking
make type-check

# Build
npm run build
```

#### Pre-commit Checks

All commits automatically run:

- Trailing whitespace removal
- End-of-file fixing
- YAML/JSON/TOML validation
- Python AST validation
- Ruff linting and formatting
- Prettier formatting
- Secret scanning (Entro)

### Dependency Management

#### Version Constraints

- **Python**: Use flexible constraints (`>=`) for better compatibility
  - Example: `pytest>=8.0` instead of `pytest==8.0.0`
- **Node.js**: Use caret (`^`) for minor version flexibility
  - Example: `^18.0.0` allows `>=18.0.0 <19.0.0`

#### Keeping Dependencies Updated

```bash
# Check for outdated npm packages
npm outdated

# Check for outdated Python packages
pip list --outdated
```

### Git Workflow

#### Branch Strategy

- `main`: Production-ready code
- Feature branches: For new features and fixes

#### Commit Guidelines

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- All commits must pass pre-commit hooks
- Never force push to `main`

### Performance Optimization

#### Build Performance

- TypeScript incremental compilation with `.tsbuildinfo`
- Parallel test execution reduces feedback loop time

#### Runtime Performance

- Git operations use `--depth 1` for shallow clones
- Efficient file scanning with exclusion patterns
- Minimal external dependencies in sync scripts

### Configuration Files

#### Centralized Python Config (`pyproject.toml`)

All Python tool configuration in one place:

- `basedpyright`: Type checking rules
- `ruff`: Linting and formatting rules
- `pytest`: Test configuration
- `coverage`: Coverage reporting

#### TypeScript Config (`tsconfig.json`)

Strict compiler options for maximum type safety

#### Editor Config (`.editorconfig`)

Consistent formatting across editors

### Security Practices

- Secret scanning via Entro in pre-commit hooks
- No sensitive data in repository
- `.gitignore` properly configured for credentials and caches
- Automated `.gitignore` management by sync scripts

<!-- BEGIN MCP SKILLS - DO NOT EDIT MANUALLY -->

## MCP-Managed Skills

This project uses the **Skills MCP Server** to dynamically manage both local SKILL.md files and skills from remote Git repositories.

# Skills

**What are Skills?**

Skills are structured instruction sets that enhance AI assistant capabilities for specific domains or tasks. Each skill is a folder containing:

- **SKILL.md** - Core instructions and guidelines
- **references/** - Detailed documentation and examples
- **scripts/** - Helper scripts and templates
- **config/** - Configuration files

Skills provide domain-specific knowledge, best practices, code templates, and troubleshooting strategies. Think of them as specialized "expert personas" for areas like dbt development, Snowflake operations, or testing frameworks.

**Key Features:**

- Skills can be enabled `[x]` or disabled `[ ]` individually

**Available Skills:**

### github-com/anthropics-skills

- [x] **[algorithmic-art](.skills/repositories/github-com/anthropics-skills/algorithmic-art/SKILL.md)** - Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.
- [x] **[artifacts-builder](.skills/repositories/github-com/anthropics-skills/artifacts-builder/SKILL.md)** - Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.
- [x] **[brand-guidelines](.skills/repositories/github-com/anthropics-skills/brand-guidelines/SKILL.md)** - Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
- [x] **[canvas-design](.skills/repositories/github-com/anthropics-skills/canvas-design/SKILL.md)** - Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.
- [x] **[docx](.skills/repositories/github-com/anthropics-skills/document-skills/docx/SKILL.md)** - Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks
- [x] **[internal-comms](.skills/repositories/github-com/anthropics-skills/internal-comms/SKILL.md)** - A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).
- [x] **[mcp-builder](.skills/repositories/github-com/anthropics-skills/mcp-builder/SKILL.md)** - Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
- [x] **[pdf](.skills/repositories/github-com/anthropics-skills/document-skills/pdf/SKILL.md)** - Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale.
- [x] **[pptx](.skills/repositories/github-com/anthropics-skills/document-skills/pptx/SKILL.md)** - Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks
- [x] **[skill-creator](.skills/repositories/github-com/anthropics-skills/skill-creator/SKILL.md)** - Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
- [x] **[slack-gif-creator](.skills/repositories/github-com/anthropics-skills/slack-gif-creator/SKILL.md)** - Toolkit for creating animated GIFs optimized for Slack, with validators for size constraints and composable animation primitives. This skill applies when users request animated GIFs or emoji animations for Slack from descriptions like "make me a GIF for Slack of X doing Y".
- [x] **[template-skill](.skills/repositories/github-com/anthropics-skills/template-skill/SKILL.md)** - Replace with description of the skill and when Claude should use it.
- [x] **[theme-factory](.skills/repositories/github-com/anthropics-skills/theme-factory/SKILL.md)** - Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.
- [x] **[webapp-testing](.skills/repositories/github-com/anthropics-skills/webapp-testing/SKILL.md)** - Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.
- [x] **[xlsx](.skills/repositories/github-com/anthropics-skills/document-skills/xlsx/SKILL.md)** - Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. When Claude needs to work with spreadsheets (.xlsx, .xlsm, .csv, .tsv, etc) for: (1) Creating new spreadsheets with formulas and formatting, (2) Reading or analyzing data, (3) Modify existing spreadsheets while preserving formulas, (4) Data analysis and visualization in spreadsheets, or (5) Recalculating formulas

### github-com/sfc-gh-dflippo-snowflake-dbt-demo

- [x] **[dbt-architecture](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-architecture/SKILL.md)** - dbt project structure using medallion architecture (bronze/silver/gold layers). Use this skill when planning project organization, establishing folder structure, defining naming conventions, implementing layer-based configuration, or ensuring proper model dependencies and architectural patterns.
- [x] **[dbt-artifacts](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-artifacts/SKILL.md)** - Monitor dbt execution using the dbt Artifacts package. Use this skill when you need to track test and model execution history, analyze run patterns over time, monitor data quality metrics, or enable programmatic access to dbt execution metadata across any dbt version or platform.
- [x] **[dbt-commands](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-commands/SKILL.md)** - dbt command-line operations, model selection syntax, Jinja patterns, troubleshooting, and debugging. Use this skill when running dbt commands, selecting specific models, debugging compilation errors, using Jinja macros, or troubleshooting dbt execution issues.
- [x] **[dbt-core](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-core/SKILL.md)** - Managing dbt-core locally - installation, configuration, project setup, package management, troubleshooting, and development workflow. Use this skill for all aspects of local dbt-core development including non-interactive scripts for environment setup with conda or venv, and comprehensive configuration templates for profiles.yml and dbt_project.yml.
- [x] **[dbt-materializations](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-materializations/SKILL.md)** - Choosing and implementing dbt materializations (ephemeral, view, table, incremental, snapshots, Python models). Use this skill when deciding on materialization strategy, implementing incremental models, setting up snapshots for SCD Type 2 tracking, or creating Python models for machine learning workloads.
- [x] **[dbt-modeling](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-modeling/SKILL.md)** - Writing dbt models with proper CTE patterns, SQL structure, and layer-specific templates. Use this skill when writing or refactoring dbt models, implementing CTE patterns, creating staging/intermediate/mart models, or ensuring proper SQL structure and dependencies.
- [x] **[dbt-performance](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-performance/SKILL.md)** - Optimizing dbt and Snowflake performance through materialization choices, clustering keys, warehouse sizing, and query optimization. Use this skill when addressing slow model builds, optimizing query performance, sizing warehouses, implementing clustering strategies, or troubleshooting performance issues.
- [x] **[dbt-projects-on-snowflake](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-projects-on-snowflake/SKILL.md)** - Deploying, managing, executing, and monitoring dbt projects natively within Snowflake using dbt PROJECT objects and event tables. Use this skill when you want to set up dbt development workspaces, deploy projects to Snowflake, schedule automated runs, monitor execution with event tables, or enable team collaboration directly in Snowflake.
- [x] **[dbt-projects-snowflake-setup](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-projects-snowflake-setup/SKILL.md)** - Step-by-step setup guide for dbt Projects on Snowflake including prerequisites, external access integration, Git API integration, event table configuration, and automated scheduling. Use this skill when setting up dbt Projects on Snowflake for the first time or troubleshooting setup issues.
- [x] **[dbt-testing](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/dbt-testing/SKILL.md)** - dbt testing strategies using dbt_constraints for database-level enforcement, generic tests, and singular tests. Use this skill when implementing data quality checks, adding primary/foreign key constraints, creating custom tests, or establishing comprehensive testing frameworks across bronze/silver/gold layers.
- [x] **[playwright-mcp](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/playwright-mcp/SKILL.md)** - Browser testing, web scraping, and UI validation using Playwright MCP. Use this skill when you need to test Streamlit apps, validate web interfaces, test responsive design, check accessibility, or automate browser interactions through MCP tools.
- [x] **[schemachange](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/schemachange/SKILL.md)** - Deploying and managing Snowflake database objects using version control with schemachange. Use this skill when you need to manage database migrations for objects not handled by dbt, implement CI/CD pipelines for schema changes, or coordinate deployments across multiple environments.
- [x] **[snowflake-cli](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/snowflake-cli/SKILL.md)** - Executing SQL, managing Snowflake objects, deploying applications, and orchestrating data pipelines using the Snowflake CLI (snow) command. Use this skill when you need to run SQL scripts, deploy Streamlit apps, execute Snowpark procedures, manage stages, automate Snowflake operations from CI/CD pipelines, or work with variables and templating.
- [x] **[snowflake-connections](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/snowflake-connections/SKILL.md)** - Configuring Snowflake connections using connections.toml (for Snowflake CLI, Streamlit, Snowpark) or profiles.yml (for dbt) with multiple authentication methods (SSO, key pair, username/password, OAuth), managing multiple environments, and overriding settings with environment variables. Use this skill when setting up Snowflake CLI, Streamlit apps, dbt, or any tool requiring Snowflake authentication and connection management.
- [x] **[streamlit-development](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/streamlit-development/SKILL.md)** - Developing, testing, and deploying Streamlit data applications on Snowflake. Use this skill when you're building interactive data apps, setting up local development environments, testing with pytest or Playwright, or deploying apps to Snowflake using Streamlit in Snowflake.
- [x] **[task-master](.skills/repositories/github-com/sfc-gh-dflippo-snowflake-dbt-demo/.claude/skills/task-master/SKILL.md)** - AI-powered task management for structured, specification-driven development. Use this skill when you need to manage complex projects with PRDs, break down tasks into subtasks, track dependencies, and maintain organized development workflows across features and branches.

<!-- END MCP SKILLS - DO NOT EDIT MANUALLY -->
