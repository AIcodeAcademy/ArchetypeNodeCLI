import { type CommandOptions, args } from "./args.adapter.ts";
import { meteoCommand } from "./meteo.command.ts";

export const commandsController = {
	runParsedCommand: async () => {
		const command: CommandOptions = args.parseCommand();

		switch (command.command) {
			case "meteo": {
				await meteoCommand.run({ useCache: command.options.cache });
				break;
			}
			default: {
				throw new Error(`Command ${JSON.stringify(command)} not processable`);
			}
		}
	},
};
