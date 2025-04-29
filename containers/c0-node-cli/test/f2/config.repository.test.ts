import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { readConfig } from '../../src/system/config/config.repository.ts';
import type { Config } from '../../src/system/config/config.type.ts';

const TEST_DIR = path.join('.', 'test', 'system');
const VALID_CONFIG_PATH = './config.json';
const INVALID_CONFIG_PATH = './not-found.json';
const INVALID_JSON_PATH = path.join(TEST_DIR, 'invalid.json');

describe('config.repository', () => {
  before(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    await fs.writeFile(INVALID_JSON_PATH, '{ invalid json }');
  });

  it('should load config from a valid JSON file', async () => {
    const config: Config = await readConfig(VALID_CONFIG_PATH);
    assert.equal(typeof config, 'object');
    assert.ok(config.log);
    assert.equal(typeof config.log.minLevel, 'string');
    assert.ok(Array.isArray(config.log.transports));
  });

  it('should throw error for missing config file', async () => {
    await assert.rejects(() => readConfig(INVALID_CONFIG_PATH));
  });

  it('should throw error for invalid JSON', async () => {
    await assert.rejects(() => readConfig(INVALID_JSON_PATH));
  });

  // Cleanup
  after(async () => {
    await fs.unlink(INVALID_JSON_PATH).catch(() => {});
  });
});
