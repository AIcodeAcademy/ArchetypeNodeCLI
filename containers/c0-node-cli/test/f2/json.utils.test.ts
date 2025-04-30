import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, beforeEach, describe, test } from "node:test";
import { readJsonFile, writeJsonFile } from "../../src/system/json.utils.ts";

/**
 * Given json.utils
 * When writing and reading JSON file
 * Then it should maintain data integrity
 * When reading non-existent file
 * Then it should throw error
 */
describe("Given json.utils", () => {
	const TEST_DIR = path.join(".", "test", "system");
	const TEST_PATH = path.join(TEST_DIR, "test.json");
	const INVALID_PATH = path.join(TEST_DIR, "invalid2.json");

	before(async () => {
		// Arrange
		await fs.mkdir(TEST_DIR, { recursive: true });
	});

	beforeEach(() => {
		// Reset any mocks or state
	});

	describe("When writing and reading JSON file", () => {
		test("Then it should maintain data integrity", async () => {
			// Arrange
			const data = { foo: "bar", n: 42 };

			// Act
			await writeJsonFile(TEST_PATH, data);
			const result = await readJsonFile<typeof data>(TEST_PATH);

			// Assert
			assert.deepEqual(result, data);
		});
	});

	describe("When reading non-existent file", () => {
		test("Then it should throw error", async () => {
			// Act & Assert
			await assert.rejects(() => readJsonFile(INVALID_PATH));
		});
	});

	after(async () => {
		// Cleanup
		await fs.unlink(TEST_PATH).catch(() => {});
	});
});
