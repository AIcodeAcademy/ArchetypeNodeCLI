import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";
import { args } from "../../src/application/args.adapter.ts";

// Arrange
const originalArgv = process.argv;
const mockArgv = (args: string[]) => {
	process.argv = ["node", "script.js", ...args];
};

/**
 * Given args.adapter
 * When parseCommand is called with meteo command and cache option
 * Then it should parse command meteo and cache option correctly
 * When parseCommand is called with meteo command and short cache option
 * Then it should parse command meteo and cache option correctly
 * When parseCommand is called with meteo command without options
 * Then it should parse command meteo and default cache to false
 */
describe("Given args.adapter", () => {
	beforeEach(() => {
		// Arrange
		process.argv = originalArgv;
	});

	describe("When parseCommand is called with meteo command and cache option", () => {
		beforeEach(() => {
			// Arrange
			mockArgv(["meteo", "--cache"]);
		});

		test("Then it should parse command meteo and cache option", () => {
			// Act
			const result = args.parseCommand();

			// Assert
			assert.strictEqual(result.command, "meteo");
			assert.strictEqual(result.options.cache, true);
		});
	});

	describe("When parseCommand is called with meteo command and short cache option", () => {
		beforeEach(() => {
			// Arrange
			mockArgv(["meteo", "-c"]);
		});

		test("Then it should parse command meteo and cache option", () => {
			// Act
			const result = args.parseCommand();

			// Assert
			assert.strictEqual(result.command, "meteo");
			assert.strictEqual(result.options.cache, true);
		});
	});

	describe("When parseCommand is called with meteo command without options", () => {
		beforeEach(() => {
			// Arrange
			mockArgv(["meteo"]);
		});

		test("Then it should parse command name and default cache to false", () => {
			// Act
			const result = args.parseCommand();

			// Assert
			assert.strictEqual(result.command, "meteo");
			assert.strictEqual(result.options.cache, false);
		});
	});
});
