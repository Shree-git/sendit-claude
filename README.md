# SendIt for Claude

Official [SendIt](https://sendit.infiniteappsai.com) social publishing integration for Claude and Claude Code.
The plugin connects an OAuth MCP server and includes a workflow skill for account selection, media uploads, validation, publishing, scheduling, and analytics.

## Install

In Claude Code:

```text
/plugin marketplace add Shree-git/sendit-claude
/plugin install sendit-social@sendit-plugins
```

Open `/mcp` and authenticate SendIt in your browser.
Ask Claude to list your connected accounts, or invoke `/sendit-social:sendit`.

For Claude chat or Desktop, download `sendit-plugin.zip` from the [latest release](https://github.com/Shree-git/sendit-claude/releases/latest) and upload it through Customize > Plugins.
The release also includes `sendit-skill.zip` for standalone skill uploads.

Read the [install guide and examples](plugins/sendit/README.md), [data handling notes](plugins/sendit/docs/data-handling.md), and [directory submission status](plugins/sendit/docs/directory-submission.md).
The remote MCP endpoint is `https://sendit.infiniteappsai.com/api/mcp/claude`.

## Verify

The plugin source is `plugins/sendit`.
From this repository root, run:

```bash
claude plugin validate --strict plugins/sendit/.claude-plugin/plugin.json
claude plugin validate --strict .claude-plugin/marketplace.json
npm ci && npm test
```

The npm dependencies are for verification only and are outside the distributed plugin.
The protocol tests do not publish social content.

Report issues through [GitHub Issues](https://github.com/Shree-git/sendit-claude/issues).
The integration files use the [MIT license](LICENSE).
