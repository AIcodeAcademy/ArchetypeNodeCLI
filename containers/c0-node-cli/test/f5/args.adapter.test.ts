import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { parseCommand } from "../../src/application/args.adapter.ts";

// Mock process.argv
const originalArgv = process.argv;
const mockArgv = (args: string[]) => {
	process.argv = ["node", "script.js", ...args];
};

describe("parseCommand", () => {
	afterEach(() => {
		// Restore original process.argv
		process.argv = originalArgv;
	});

	it("should parse command name and options", () => {
		// Arrange
		mockArgv(["meteo", "--cache"]);

		// Act
		const result = parseCommand();

		// Assert
		assert.strictEqual(result.command, "meteo");
		assert.strictEqual(result.options.cache, true);
	});

	it("should use short option alias", () => {
		// Arrange
		mockArgv(["meteo", "-c"]);

		// Act
		const result = parseCommand();

		// Assert
		assert.strictEqual(result.command, "meteo");
		assert.strictEqual(result.options.cache, true);
	});

	it("should default cache to false when not specified", () => {
		// Arrange
		mockArgv(["meteo"]);

		// Act
		const result = parseCommand();

		// Assert
		assert.strictEqual(result.command, "meteo");
		assert.strictEqual(result.options.cache, false);
	});
});
