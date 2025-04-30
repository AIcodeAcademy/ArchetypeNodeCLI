import assert from "node:assert/strict";
import { beforeEach, describe, mock, test } from "node:test";
import {
	type CommandOptions,
	args,
} from "../../src/application/args.adapter.ts";
import { commandsController } from "../../src/application/commands.controller.ts";
import { meteoCommand } from "../../src/application/meteo.command.ts";

// Arrange
const parsedCommandMock: CommandOptions = {
	command: "meteo",
	options: { cache: true },
};
const argsParseCommandSpy = mock.method(args, "parseCommand");
const meteoCommandRunSpy = mock.method(meteoCommand, "run");
/**
 * Given commandsController
 * When parsed command is meteo
 * Then runMeteoCommand is called once
 */
describe("Given commandsController", () => {
	beforeEach(() => {
		// Arrange
		meteoCommandRunSpy.mock.mockImplementation(() => Promise.resolve());
	});

	describe("When parsed command is meteo", () => {
		beforeEach(async () => {
			// Arrange
			argsParseCommandSpy.mock.mockImplementation(() => parsedCommandMock);
			// Act
			await commandsController.runParsedCommand();
		});

		test("Then runMeteoCommand is called once", async () => {
			// Assert
			assert.strictEqual(argsParseCommandSpy.mock.calls.length, 1);
			assert.strictEqual(meteoCommandRunSpy.mock.calls.length, 1);
		});
	});
});
