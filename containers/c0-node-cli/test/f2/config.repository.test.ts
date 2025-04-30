import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { after, before, beforeEach, describe, test } from "node:test";
import { readConfig } from "../../src/system/config/config.repository.ts";
import type { Config } from "../../src/system/config/config.type.ts";

/**
 * Given config.repository
 * When reading config file
 * Then it should load valid config
 * When reading non-existent file
 * Then it should throw error
 * When reading invalid JSON
 * Then it should throw error
 */
describe("Given config.repository", () => {
	const TEST_DIR = path.join(".", "test", "system");
	const VALID_CONFIG_PATH = "./config.json";
	const INVALID_CONFIG_PATH = "./not-found.json";
	const INVALID_JSON_PATH = path.join(TEST_DIR, "invalid.json");

	before(async () => {
		// Arrange
		await fs.mkdir(TEST_DIR, { recursive: true });
		await fs.writeFile(INVALID_JSON_PATH, "{ invalid json }");
	});

	beforeEach(() => {
		// Reset any mocks or state
	});

	describe("When reading valid config file", () => {
		test("Then it should load config with correct structure", async () => {
			// Act
			const config: Config = await readConfig(VALID_CONFIG_PATH);

			// Assert
			assert.equal(typeof config, "object");
			assert.ok(config.log);
			assert.equal(typeof config.log.minLevel, "string");
			assert.ok(Array.isArray(config.log.transports));
		});
	});

	describe("When reading non-existent config file", () => {
		test("Then it should throw error", async () => {
			// Act & Assert
			await assert.rejects(() => readConfig(INVALID_CONFIG_PATH));
		});
	});

	describe("When reading invalid JSON file", () => {
		test("Then it should throw error", async () => {
			// Act & Assert
			await assert.rejects(() => readConfig(INVALID_JSON_PATH));
		});
	});

	after(async () => {
		// Cleanup
		await fs.unlink(INVALID_JSON_PATH).catch(() => {});
	});
});
