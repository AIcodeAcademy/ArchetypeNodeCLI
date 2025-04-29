import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { readJsonFile, writeJsonFile } from '../../src/system/json.utils.ts';

const TEST_DIR = path.join('.', 'test', 'system');
const TEST_PATH = path.join(TEST_DIR, 'test.json');
const INVALID_PATH = path.join(TEST_DIR, 'invalid2.json');

describe('json.utils', () => {
  before(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('should write and read JSON file', async () => {
    const data = { foo: 'bar', n: 42 };
    await writeJsonFile(TEST_PATH, data);
    const result = await readJsonFile<typeof data>(TEST_PATH);
    assert.deepEqual(result, data);
  });

  it('should throw error for missing file', async () => {
    await assert.rejects(() => readJsonFile(INVALID_PATH));
  });

  after(async () => {
    await fs.unlink(TEST_PATH).catch(() => {});
  });
});
