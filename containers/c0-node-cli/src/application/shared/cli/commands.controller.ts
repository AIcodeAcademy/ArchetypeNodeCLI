import type { ParseArgsOptionsConfig } from "node:util";
import { cli } from "./cli.adapter.ts";
import type { CommandHandler } from "./command-handler.interface.ts";
import type { Command } from "./command.type.ts";

export const commandsController = {
	runParsedCommand: async () => {
		const command: Command = cli.getCommandOptions(parseOptions);
		const commandHandler = getCommand(command.name);
		if (!commandHandler) {
			throw new Error(`Command ${command.name} not found`);
		}
		await commandHandler.run(command.options);
	},

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
