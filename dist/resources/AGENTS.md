# AI Agent Configuration

Context and guidelines for AI coding agents.


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


<!-- END MCP SKILLS - DO NOT EDIT MANUALLY -->
