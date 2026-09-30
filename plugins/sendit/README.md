# SendIt for Claude

Publish and schedule social posts from Claude through [SendIt](https://sendit.infiniteappsai.com).
This plugin connects SendIt's hosted MCP service and includes a skill for choosing accounts, uploading media, validating content, and checking publishing results.
It uses browser OAuth; the package contains no API keys and launches no local server.

## Install in Claude Code

Run these commands in Claude Code:

```text
/plugin marketplace add Shree-git/sendit-claude
/plugin install sendit-social@sendit-plugins
```

Or use the terminal:

```bash
claude plugin marketplace add Shree-git/sendit-claude
claude plugin install sendit-social@sendit-plugins
```

Restart Claude Code if needed, open `/mcp`, and authenticate the SendIt server in your browser.
Then ask:

```text
Use SendIt to list my connected social accounts. Do not publish anything.
```

The skill is also available explicitly as `/sendit-social:sendit`.
Connect the social accounts you want to use when SendIt returns their authorization instructions.

## Install in Claude chat or Desktop

Download `sendit-plugin.zip` from the [latest release](https://github.com/Shree-git/sendit-claude/releases/latest).
Open Customize > Plugins > Add > Upload plugin in a Claude surface that supports plugin uploads.
Open the plugin's Connectors tab and complete SendIt OAuth.
Availability depends on your Claude plan and organization settings.

If you prefer a standalone skill, upload `sendit-skill.zip` through Customize > Skills and add SendIt as a custom connector separately.
The skill ZIP contains `sendit/SKILL.md`; it provides workflow instructions and requires the connector for service access.
See [connection setup](skills/sendit/references/connection.md) for connector-only installation.

## Examples

- "Use SendIt to list my connected accounts."
- "Validate and preview this LinkedIn announcement before I publish it."
- "Publish this approved announcement to my LinkedIn account."
- "Schedule this post for October 15, 2026 at 9 am America/Los_Angeles."
- "Create an upload link for this photo, then help me post it to Instagram."
- "Show my scheduled posts and their status."
- "How did my latest LinkedIn post perform?"

SendIt reports platform requirements and connection availability through its tools.
Do not assume every platform supports the same text, images, or video.
Draft and preview requests do not publish content.
Publishing and scheduling require a clear request for the specific content and destination.

## Data and permissions

Claude sends the selected tool inputs to SendIt over HTTPS.
Publishing sends the approved content and media to the selected social platforms through SendIt.
Uploads, schedules, connected-account metadata, and analytics are processed under [SendIt's privacy policy](https://sendit.infiniteappsai.com/privacy).
The plugin stores no credentials itself and adds no hooks, background jobs, or telemetry.
OAuth credentials are managed by the Claude client and SendIt.
Read the [data handling notes](docs/data-handling.md) for the scope of this integration.

## Public availability

The GitHub marketplace and release downloads are the public distribution source for this package.
Anthropic directory approval is separate from publishing this repository.
See [directory submission status](docs/directory-submission.md) for the current review state and submission requirements.

## Development

This plugin needs no build step or npm dependencies.
Its files live in `plugins/sendit`; verification dependencies remain outside that directory.
Validate both manifests with a current Claude Code CLI:

```bash
claude plugin validate --strict plugins/sendit/.claude-plugin/plugin.json
claude plugin validate --strict .claude-plugin/marketplace.json
claude --plugin-dir plugins/sendit
```

Run these commands from the repository root.
Use `/mcp` and `/sendit-social:sendit` to verify the loaded connector and skill.
For the remote protocol checks, run `npm ci && npm test` with Node.js 22 or newer.
Those checks discover the live tool surface and verify unauthenticated access boundaries; they do not publish social content.

Report integration bugs through [GitHub Issues](https://github.com/Shree-git/sendit-claude/issues).
The integration files are licensed under [MIT](LICENSE).
Using the SendIt service is subject to its own terms and plan limits.
