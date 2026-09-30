# Connect SendIt

## Claude Code plugin

Install from the public SendIt marketplace:

```text
/plugin marketplace add Shree-git/sendit-claude
/plugin install sendit-social@sendit-plugins
```

Restart Claude Code after installation if the plugin is not loaded yet.
Run `/mcp`, select the SendIt server, and complete the browser OAuth flow when prompted.
Then run `/sendit-social:sendit` or ask Claude to list your connected SendIt accounts.

## Claude Code connector only

Use this if you want MCP tools without the plugin skill:

```bash
claude mcp add --transport http --scope user sendit https://sendit.infiniteappsai.com/api/mcp/claude
```

Open Claude Code and authenticate SendIt through `/mcp`.
Do not configure the same endpoint twice if the SendIt plugin is already installed.

## Claude web and Desktop

Open Settings, then Connectors, and add a custom connector named `SendIt` with this URL:

```text
https://sendit.infiniteappsai.com/api/mcp/claude
```

Complete the OAuth login and authorization.
An organization administrator may need to enable custom connectors.
The remote connector runs on SendIt's service and needs no local Node.js server or API key in chat.

To add the standalone workflow skill, download `sendit-skill.zip` from the repository's GitHub Releases page and upload it through Claude's skill settings.
Skill uploads require the capabilities and plan support described in [Anthropic's skills documentation](https://claude.com/docs/skills/how-to).
Uploading a skill alone does not install a connector.

## Verify

Ask:

```text
Use SendIt to list my connected social accounts. Do not publish anything.
```

Claude should call `list_connected_accounts` and return your real account connection state.
If there are no accounts, ask it to connect the intended platform and follow the returned authorization instructions.
