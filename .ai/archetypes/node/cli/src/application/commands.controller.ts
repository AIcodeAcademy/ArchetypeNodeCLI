import { type CommandOptions, parseCommand } from "./args.adapter.ts";
import { runMeteoCommand } from "./meteo.command.ts";

export const commandsController = async () => {
	const command: CommandOptions = parseCommand();

	switch (command.command) {
		case "meteo": {
			await runMeteoCommand({ useCache: command.options.cache });
			break;
		}
	}
};
