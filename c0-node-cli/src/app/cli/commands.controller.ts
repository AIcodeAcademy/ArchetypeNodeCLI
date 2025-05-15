import type { ParseArgsOptionsConfig } from "node:util";
import type { CommandHandler } from "../shared/models/command-handler.interface.ts";
import { cli } from "./cli.adapter.ts";
import type { Command } from "./command.type.ts";

/**
 * Controller for managing and executing CLI commands.
 * Handles command registration, parsing, and execution.
 */
export const commandsController = {
	/**
	 * Gets the parsed command from CLI arguments.
	 * @returns {Command} The parsed command
	 */
	getParsedCommand: (): Command => {
		const command: Command = cli.getCommandOptions(parseOptions);
		return command;
	},

	/**
	 * Runs the parsed command.
	 * @param {Command} command - The parsed command
	 * @throws {Error} If command handler is not found
	 */
	runParsedCommand: async (command: Command) => {
		const commandHandler = getCommand(command.name);
		if (!commandHandler) {
			throw new Error(`Command ${command.name} not found`);
		}
		await commandHandler.run(command.options);
	},

	/**
	 * Adds a new command to the controller.
	 * @template T - Type of command options
	 * @param {string} name - Name of the command
	 * @param {CommandHandler<T>} command - Command handler implementation
	 */
	addCommand<T extends Record<string, unknown>>(
		name: string,
		command: CommandHandler<T>,
	) {
		commands.set(name, command);
		Object.assign(parseOptions, command.parseOptions);
	},
};

function getCommand(
	name: string | undefined,
): CommandHandler<Record<string, unknown>> | undefined {
	if (!name) {
		return commands.values().next().value;
	}
	return commands.get(name);
}

const commands = new Map<string, CommandHandler<Record<string, unknown>>>([]);

const parseOptions: ParseArgsOptionsConfig = {};
