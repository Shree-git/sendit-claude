# Claude directory submission

The public GitHub marketplace is independent of Anthropic's directory review.
This document records submission material and verification coverage; it is not evidence of approval.

## Submission routes

Use the [Claude developer portal](https://claude.ai/directory/manage) for two listings:

1. The SendIt remote MCP connector.
2. This plugin bundle, which includes the SendIt workflow skill and references the same connector endpoint.

Anthropic documents this product distribution route in [Publish to the directory](https://claude.com/docs/directory/publish).
The official `claude-plugins-official` marketplace has a separate partner submission process.
This package is immediately installable from the public `sendit-plugins` marketplace hosted in this repository.

## Plugin source

| Field | Value |
| --- | --- |
| Repository | `Shree-git/sendit-claude` |
| Plugin path | `plugins/sendit` |
| Tracked branch | `main` |
| Plugin name | `sendit-social` |
| Display name | SendIt Social |
| Version | `1.0.0` |
| License | MIT |
| Publisher | InfiniteApps LLC |

The package contains one workflow skill and one remote HTTP MCP definition.
It contains no executable hooks, local package launchers, or credential files.
Tests and their dependencies live outside the plugin directory and are not distributed in its ZIP.

## Connector listing material

| Field | Value |
| --- | --- |
| Name | SendIt |
| Suggested slug | `sendit` |
| One-line description | Publish and schedule social posts, connect accounts, upload media, validate content, preview posts, and check engagement analytics from Claude. |
| Server URL | `https://sendit.infiniteappsai.com/api/mcp/claude` |
| Transport | Streamable HTTP |
| Authentication | Per-user OAuth with dynamic client registration and S256 PKCE |
| Scopes | `mcp offline_access` |
| Website | `https://sendit.infiniteappsai.com` |
| Documentation | `https://github.com/Shree-git/sendit-claude#readme` |
| Privacy policy | `https://sendit.infiniteappsai.com/privacy` |
| Support | `support@infiniteappsai.com` |
| Icon | `https://sendit.infiniteappsai.com/assets/SendItLogo-128.png` |
| Categories | Productivity; Marketing |
| Access | Read and write |

Listing description:

> SendIt connects Claude to your social publishing workflow.
> List connected accounts and teams, connect supported platforms, and inspect current content requirements.
> Upload media through browser upload sessions, validate and preview posts, then publish or schedule approved content.
> Review scheduled posts and engagement analytics, and manage specific posts when requested.
> A SendIt account and authorization for the intended social accounts are required.
> Platform capabilities, account permissions, and SendIt plan limits apply.

The Claude profile exposes a focused publishing catalog rather than SendIt's full service catalog.
It excludes AI image, video, and audio generation, generic connector execution, and unrelated agent or advertising operations.
Read tools carry `readOnlyHint`; modifying tools carry `destructiveHint` for Anthropic's review classification.

## OAuth endpoints

- Protected resource metadata: `https://sendit.infiniteappsai.com/.well-known/oauth-protected-resource/api/mcp/claude`
- Authorization metadata: `https://sendit.infiniteappsai.com/.well-known/oauth-authorization-server`
- Authorization: `https://sendit.infiniteappsai.com/oauth/authorize`
- Token: `https://sendit.infiniteappsai.com/oauth/token`
- Registration: `https://sendit.infiniteappsai.com/oauth/register`

The protected resource must exactly match the submitted connector URL.
Unauthenticated tool calls return a 401 challenge pointing to its resource metadata.

## Example reviewer prompts

- "Use SendIt to list my connected social accounts. Do not publish anything."
- "Validate and preview this LinkedIn announcement without publishing: 'Our next release is available.'"
- "Show my scheduled posts and their current status."
- "Create an image upload link so I can attach a photo."
- "What are the current requirements for Instagram posts?"

Publishing, scheduling, deletion, and triggering tests require a dedicated review account with disposable destinations.
Use safe test content and real test results when recording those checks.

## Data disclosures

The plugin itself stores no personal data and has no telemetry.
The declared connector processes tool arguments, account metadata, content, media, schedules, and requested analytics.
SendIt proxies authorized requests to the social platforms selected by the user.
Infrastructure processing and service retention are described in the linked privacy policy.
The package does not collect complete Claude conversations or transmit unrelated local data.
It is not designed specifically for an under-18 audience.
Read [data handling](data-handling.md) before completing the portal's disclosure fields.

## Verification and launch status

Strict plugin and marketplace validation and a local Claude Code installation have passed with Claude Code 2.1.285.
The latest MCP SDK is used to check the released endpoint's discovery and authorization contract.
Protocol checks do not establish that every social platform operation succeeds with every account.
Directory review requires a populated reviewer account and authenticated tool checks.
Do not mark those requirements complete without direct evidence.

No directory approval is claimed by this repository.
Submission and reviewer progress must be read from the portal rather than inferred from a GitHub release.

## Current Anthropic references

- [Plugin submission](https://claude.com/docs/plugins/submit)
- [Plugin checklist](https://claude.com/docs/plugins/pre-submission-checklist)
- [Connector submission](https://claude.com/docs/connectors/building/submission)
- [Connector review criteria](https://claude.com/docs/connectors/building/review-criteria)
- [Connector authentication](https://claude.com/docs/connectors/building/authentication)
