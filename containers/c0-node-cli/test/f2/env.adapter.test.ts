import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";
import { envAdapter } from "../../src/system/env/env.adapter.ts";
import { DEFAULT_ENV } from "../../src/system/env/env.type.ts";

/**
 * Given env.adapter
 * When environment variables are set
 * Then it should load them correctly
 * When environment variables are set incorrectly
 * Then it should use defaults
 * When environment variables are missing
 * Then it should use defaults
 * When checking environment structure
 * Then it should have correct types
 */
describe("Given env.adapter", () => {
	const OLD_ENV = { ...process.env };

	beforeEach(() => {
		// Arrange
		process.env = { ...OLD_ENV };
	});

	describe("When environment variables are set", () => {
		beforeEach(() => {
			// Arrange
			process.env = {
				...process.env,
				NODE_ENV: "production",
				CONFIG_FILE: "custom.json",
			};
		});

		test("Then it should load NODE_ENV and CONFIG_FILE", () => {
			// Act
			const env = envAdapter.getEnv();

			// Assert
			assert.equal(env.NODE_ENV, "production");
			assert.equal(env.CONFIG_FILE, "custom.json");
		});
	});

	describe("When environment variables are set incorrectly", () => {
		beforeEach(() => {
			// Arrange
			process.env = {
				...process.env,
				NODE_ENV: "invalid",
				CONFIG_FILE: "custom.json",
			};
		});

		test("Then it should use default values", () => {
			// Act
			const env = envAdapter.getEnv();

			// Assert
			assert.equal(env.NODE_ENV, DEFAULT_ENV.NODE_ENV);
			assert.equal(env.CONFIG_FILE, "custom.json");
		});
	});

	describe("When environment variables are missing", () => {
		beforeEach(() => {
			// Arrange
			process.env = {
				...process.env,
				NODE_ENV: undefined,
				CONFIG_FILE: undefined,
			};
		});

		test("Then it should use default values", () => {
			// Act
			const env = envAdapter.getEnv();

			// Assert
			assert.equal(env.NODE_ENV, DEFAULT_ENV.NODE_ENV);
			assert.equal(env.CONFIG_FILE, DEFAULT_ENV.CONFIG_FILE);
		});
	});

	describe("When checking environment structure", () => {
		test("Then it should have correct types", () => {
			// Act
			const env = envAdapter.getEnv();

			// Assert
			assert.equal(typeof env.NODE_ENV, "string");
			assert.equal(typeof env.CONFIG_FILE, "string");
			assert.equal(typeof env.path, "string");
			assert.equal(typeof env.isProduction, "boolean");
		});
	});
});
