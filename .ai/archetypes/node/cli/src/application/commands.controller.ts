import { type CommandOptions, parseCommand } from "./args.adapter.ts";
import { runMyMeteoCommand } from "./my-meteo.command.ts";

export const commandsController = async () => {
	const command: CommandOptions = parseCommand();

	switch (command.command) {
		case "meteo": {
			await runMyMeteoCommand({ useCache: command.options.cache });
			break;
		}
	}
};
