import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import type { CommandOptions } from "../../src/application/args.adapter.ts";
import { commandsController } from "../../src/application/commands.controller.ts";
import type { MeteoOptions } from "../../src/domain/meteo.service.ts";

// Mock process.argv
const originalArgv = process.argv;
const mockArgv = (args: string[]) => {
	process.argv = ["node", "script.js", ...args];
};

describe("commandsController", { skip: true }, () => {
	let originalParseCommand: (() => CommandOptions) | undefined;
	let originalRunMeteoCommand:
		| ((options: MeteoOptions) => Promise<void>)
		| undefined;

	beforeEach(() => {
		// Store original implementations
		originalParseCommand = (global as { parseCommand?: () => CommandOptions })
			.parseCommand;
		originalRunMeteoCommand = (
			global as { runMeteoCommand?: (options: MeteoOptions) => Promise<void> }
		).runMeteoCommand;

		// Mock implementations
		(global as { parseCommand?: () => CommandOptions }).parseCommand = () => ({
			command: "meteo",
			options: { cache: false },
		});
		(
			global as { runMeteoCommand?: (options: MeteoOptions) => Promise<void> }
		).runMeteoCommand = async () => {};
	});

	afterEach(() => {
		// Restore original implementations
		(global as { parseCommand?: () => CommandOptions }).parseCommand =
			originalParseCommand;
		(
			global as { runMeteoCommand?: (options: MeteoOptions) => Promise<void> }
		).runMeteoCommand = originalRunMeteoCommand;
		process.argv = originalArgv;
	});

	it("should execute meteo command with cache option", async () => {
		// Arrange
		let executed = false;
		(
			global as { runMeteoCommand?: (options: MeteoOptions) => Promise<void> }
		).runMeteoCommand = async (options) => {
			executed = true;
			assert.strictEqual(options.useCache, true);
		};
		(global as { parseCommand?: () => CommandOptions }).parseCommand = () => ({
			command: "meteo",
			options: { cache: true },
		});

		// Act
		await commandsController();

		// Assert
		assert.strictEqual(executed, true);
	});

	it("should execute meteo command without cache option", async () => {
		// Arrange
		let executed = false;
		(
			global as { runMeteoCommand?: (options: MeteoOptions) => Promise<void> }
		).runMeteoCommand = async (options) => {
			executed = true;
			assert.strictEqual(options.useCache, false);
		};
		(global as { parseCommand?: () => CommandOptions }).parseCommand = () => ({
			command: "meteo",
			options: { cache: false },
		});

		// Act
		await commandsController();

		// Assert
		assert.strictEqual(executed, true);
	});
});
