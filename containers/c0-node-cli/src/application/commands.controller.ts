import { helpCommand } from "../domain/help/help.command.ts";
import { ipApiCommand } from "../domain/ip-api/ip-api.command.ts";
import { cli } from "../shared/cli/cli.adapter.ts";
import type { CommandHandler } from "../shared/cli/command-handler.interface.ts";
import type { Command } from "../shared/cli/command.type.ts";

export const commandsController = {
	runParsedCommand: async () => {
		const command: Command = cli.getCommandOptions({
			useCache: { type: "boolean", default: true },
		});

		if (!command || command.name === "") {
			await helpCommand.run({});
			return;
		}

		const commandHandler = commands.get(command.name);
		if (!commandHandler) {
			throw new Error(`Command ${command.name} not found`);
		}
		await commandHandler.run(command.options);
	},

	addCommand(name: string, command: CommandHandler) {
		commands.set(name, command);
	},
};

const commands = new Map<string, CommandHandler>([
	["ip", ipApiCommand],
	["help", helpCommand],
]);
