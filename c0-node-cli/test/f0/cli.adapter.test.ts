import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import type { ParseArgsOptionsConfig } from "node:util";
import { cli } from "../../src/application/shared/cli/cli.adapter.ts";
/**
 * Given a CLI adapter
 *  When processing command line without arguments
 *   Then it should return an empty command
 *  When processing command line with command name only
 *   Then it should return a command with name without options
 *  When processing command line with command name and options
 *   Then it should return a command with name and options
 */
describe("Given a CLI adapter", () => {
	let processArgvMock: string[];
	let mockOptions: ParseArgsOptionsConfig;

	beforeEach(() => {
		processArgvMock = ["node", "script.js"];
		mockOptions = {};
	});

	describe("When processing command line without arguments", () => {
		test("Then it should return an empty command", () => {
			// Arrange
			process.argv = processArgvMock;

			// Act
			const actual = cli.getCommandOptions(mockOptions);

			// Assert
			const expected = { name: "", options: {} };
			assert.deepStrictEqual(actual, expected);
		});
	});

	describe("When processing command line with command name only", () => {
		test("Then it should return a command with name without options", () => {
			// Arrange
			processArgvMock.push("test-command");
			process.argv = processArgvMock;

			// Act
			const actual = cli.getCommandOptions(mockOptions);

			// Assert
			const expected = { name: "test-command", options: {} };
			assert.deepStrictEqual(actual, expected);
		});
	});

	describe("When processing command line with command name and options", () => {
		test("Then it should return a command with name and options", () => {
			// Arrange
			processArgvMock.push("test-command", "--option", "value");
			process.argv = processArgvMock;
			mockOptions = {
				option: {
					type: "string",
				},
			};

			// Act
			const actual = cli.getCommandOptions(mockOptions);

			// Assert
			const expected = { name: "test-command", options: { option: "value" } };
			assert.deepStrictEqual(actual, expected);
		});
	});
});
