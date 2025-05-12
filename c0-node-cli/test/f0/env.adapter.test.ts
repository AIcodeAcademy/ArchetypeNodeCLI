import assert from "node:assert";
import { afterEach, beforeEach, describe, test } from "node:test";
import { environment } from "../../src/shared/env/env.adapter.ts";
import { DEFAULT_ENV } from "../../src/shared/env/env.type.ts";

/**
 * Given an environment adapter
 *  When getting environment with default values
 *   Then it should return default environment configuration
 *  When getting environment with custom values
 *   Then it should return environment with custom values
 *  When getting environment in production
 *   Then it should set isProduction to true
 */
describe("Given an environment adapter", () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeEach(() => {
		originalEnv = { ...process.env };
		process.env = {};
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	describe("When getting environment with default values", () => {
		test("Then it should return default environment configuration", () => {
			const actual = environment.get();

			assert.deepStrictEqual(actual, DEFAULT_ENV);
		});
	});

	describe("When getting environment with custom values", () => {
		test("Then it should return environment with custom values", () => {
			process.env.APP_ENVIRONMENT = "staging";
			process.env.APP_NAME = "custom-app";
			process.env.APP_PATH = "/custom/path";

			const actual = environment.get();

			const expected = {
				...DEFAULT_ENV,
				environment: "staging",
				name: "custom-app",
				path: "/custom/path",
				isProduction: false,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});

	describe("When getting environment in production", () => {
		test("Then it should set isProduction to true", () => {
			process.env.APP_ENVIRONMENT = "production";

			const actual = environment.get();

			const expected = {
				...DEFAULT_ENV,
				environment: "production",
				isProduction: true,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});
});
