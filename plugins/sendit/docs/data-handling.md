# Data handling

This repository distributes Claude instructions and a remote MCP connection definition.
It contains no executable hooks, package launchers, local credential readers, or background tasks.
Installing the plugin does not grant access to social accounts until the user completes SendIt OAuth.

The connection sends tool arguments to `https://sendit.infiniteappsai.com` over HTTPS.
These arguments can include post text, captions, media URLs, target platforms, schedule times, and account or team identifiers.
SendIt returns account connection metadata, publishing and scheduling results, platform requirements, and analytics as requested.
Publishing and upload operations can store or transmit user content as part of the SendIt service.
This plugin does not collect whole Claude conversations or forward unrelated conversation data.
SendIt may then transmit the selected content and media to the social platforms chosen by the user.

The plugin package has no separate credential or data store.
Claude manages its MCP OAuth credentials, and SendIt manages account and service data.
See [SendIt's privacy policy](https://sendit.infiniteappsai.com/privacy) for service retention, deletion, and storage practices.
Do not infer a retention period from the package's MIT license.

The skill directs Claude to use upload sessions for local files and chat attachments.
It does not scan the filesystem for credentials or other content.
Tools returned from a server, uploaded files, and external social content are treated as data rather than instructions.

The Claude integration focuses on social publishing, scheduling, account connection, media uploads, and analytics.
It does not expose SendIt's AI media generation tools.
