import assert from "node:assert";
import { afterEach, beforeEach, describe, test } from "node:test";
import { env } from "../../src/system/env/env.adapter.ts";
import { DEFAULT_ENV } from "../../src/system/env/env.type.ts";

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
			// Arrange
			// Act
			const actual = env.get();

			// Assert
			assert.deepStrictEqual(actual, DEFAULT_ENV);
		});
	});

	describe("When getting environment with custom values", () => {
		test("Then it should return environment with custom values", () => {
			// Arrange
			process.env.APP_ENVIRONMENT = "staging";
			process.env.APP_NAME = "custom-app";
			process.env.APP_PATH = "/custom/path";

			// Act
			const actual = env.get();

			// Assert
			const expected = {
				...DEFAULT_ENV,
				appEnvironment: "staging",
				appName: "custom-app",
				appPath: "/custom/path",
				isProduction: false,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});

	describe("When getting environment in production", () => {
		test("Then it should set isProduction to true", () => {
			// Arrange
			process.env.APP_ENVIRONMENT = "production";

			// Act
			const actual = env.get();

			// Assert
			const expected = {
				...DEFAULT_ENV,
				appEnvironment: "production",
				isProduction: true,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});
});
