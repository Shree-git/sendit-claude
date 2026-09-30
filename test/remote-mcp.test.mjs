import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const config = JSON.parse(await readFile(new URL('../.mcp.json', import.meta.url), 'utf8'));
const endpoint = new URL(config.mcpServers.sendit.url);
const expectedTools = [
  'list_connected_accounts', 'list_teams', 'connect_platform',
  'get_platform_requirements', 'get_platform_settings_schema',
  'validate_content', 'preview_content', 'create_upload_session', 'get_upload_session',
  'publish_content', 'schedule_content', 'get_scheduled_posts', 'get_scheduled_post',
  'delete_scheduled_post', 'delete_post', 'trigger_scheduled_post',
  'get_analytics', 'get_post_analytics',
];

test('the official MCP client connects and discovers the publishing profile', async () => {
  const client = new Client({ name: 'sendit-claude-release-check', version: '1.0.0' });
  try {
    await client.connect(new StreamableHTTPClientTransport(endpoint));
    const { tools } = await client.listTools();
    const names = new Set(tools.map(tool => tool.name));
    assert.deepEqual([...names].sort(), [...expectedTools].sort(), 'The release must expose only the focused publishing catalog');
    assert.equal(names.size, tools.length, 'Tool names must be unique');
    assert.ok(!names.has('generate_ai_media'), 'Claude profile must not expose AI media generation');
    for (const tool of tools) {
      assert.ok(tool.title?.trim(), `${tool.name} needs a title`);
      assert.ok(tool.name.length <= 64, `${tool.name} exceeds the tool name limit`);
      assert.ok(tool.annotations?.readOnlyHint === true || tool.annotations?.destructiveHint === true, `${tool.name} needs a read or write annotation`);
    }
    assert.equal(client.getServerCapabilities().resources, undefined, 'The focused profile must not advertise unrelated widget resources');
  } finally {
    await client.close();
  }
});

test('missing and invalid credentials yield discoverable OAuth challenges', async () => {
  for (const authorization of [undefined, 'Bearer invalid-release-check-token']) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
        ...(authorization ? { authorization } : {}),
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'list_connected_accounts', arguments: {} } }),
    });
    assert.equal(response.status, 401);
    const challenge = response.headers.get('www-authenticate');
    assert.ok(challenge?.startsWith('Bearer '));
    const metadataUrl = challenge.match(/resource_metadata="([^"]+)"/)?.[1];
    assert.ok(metadataUrl, 'Challenge must identify protected-resource metadata');
    const metadataResponse = await fetch(metadataUrl);
    assert.equal(metadataResponse.status, 200);
    const metadata = await metadataResponse.json();
    assert.equal(metadata.resource, endpoint.href);
    assert.ok(metadata.scopes_supported.includes('mcp'));
    const issuer = metadata.authorization_servers[0];
    const authorizationResponse = await fetch(new URL('/.well-known/oauth-authorization-server', issuer));
    assert.equal(authorizationResponse.status, 200);
    const server = await authorizationResponse.json();
    assert.ok(server.code_challenge_methods_supported.includes('S256'));
    assert.ok(server.token_endpoint_auth_methods_supported.includes('none'));
    assert.equal(new URL(server.registration_endpoint).protocol, 'https:');
    assert.equal(new URL(server.token_endpoint).protocol, 'https:');
  }
});

test('out-of-profile tools cannot be invoked', async () => {
  for (const name of ['generate_ai_media', 'execute_connector_operation']) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name, arguments: {} } }),
    });
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.equal(payload.error?.code, -32601, `Hidden tool ${name} must be rejected before authentication`);
  }
});
