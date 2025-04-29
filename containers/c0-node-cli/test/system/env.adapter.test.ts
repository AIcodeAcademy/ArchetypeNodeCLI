import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { getEnv } from '../../src/system/env/env.adapter.ts';

describe('env.adapter', () => {
  const OLD_ENV = { ...process.env };

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  it('should load NODE_ENV and CONFIG_FILE from environment', () => {
    process.env.NODE_ENV = 'production';
    process.env.CONFIG_FILE = 'custom.json';
    const env = getEnv();
    assert.equal(env.NODE_ENV, 'production');
    assert.equal(env.CONFIG_FILE, 'custom.json');
  });

  it('should fallback to defaults if env vars are missing', () => {
    delete process.env.NODE_ENV;
    delete process.env.CONFIG_FILE;
    const env = getEnv();
    assert.ok(env.NODE_ENV);
    assert.ok(env.CONFIG_FILE);
  });

  it('should provide correct type and structure', () => {
    const env = getEnv();
    assert.equal(typeof env.NODE_ENV, 'string');
    assert.equal(typeof env.CONFIG_FILE, 'string');
    assert.equal(typeof env.path, 'string');
    assert.equal(typeof env.isProduction, 'boolean');
  });
});
