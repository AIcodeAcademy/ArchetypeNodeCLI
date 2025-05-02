import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { envAdapter } from "../../src/system/env/env.adapter.ts";
import { DEFAULT_ENV } from "../../src/system/env/env.type.ts";

/**
 * Given envAdapter
 * When environment variables are set
 * Then it should load them correctly
 * When environment variables are set incorrectly
 * Then it should use defaults
 * When environment variables are missing
 * Then it should use defaults
 * When checking environment structure
 * Then it should have correct types
 */
describe("Given envAdapter", () => {
	describe("When environment variables are set", () => {
		beforeEach(() => {
			process.env.NODE_ENV = "test";
			process.env.APP_NAME = "my-app-test";
			process.env.CONFIG_FILE = "config.test.json";
		});
		test("Then it should load them correctly", () => {
			const env = envAdapter.getEnv();
			assert.strictEqual(env.NODE_ENV, "test");
			assert.strictEqual(env.APP_NAME, "my-app-test");
			assert.strictEqual(env.CONFIG_FILE, "config.test.json");
		});
	});
	describe("When environment variables are set incorrectly", () => {
		beforeEach(() => {
			process.env.NODE_ENV = "invalid";
		});
		test("Then it should use defaults", () => {
			const env = envAdapter.getEnv();
			assert.strictEqual(env.NODE_ENV, DEFAULT_ENV.NODE_ENV);
		});
	});
	describe("When environment variables are missing", () => {
		test("Then it should use defaults", () => {
			const env = envAdapter.getEnv();
			assert.strictEqual(env.NODE_ENV, DEFAULT_ENV.NODE_ENV);
		});
	});
	describe("When checking environment structure", () => {
		test("Then it should have correct types", () => {
			const env = envAdapter.getEnv();
			assert.notStrictEqual(env.path, "");
			assert.strictEqual(env.isProduction, false);
		});
	});
});
