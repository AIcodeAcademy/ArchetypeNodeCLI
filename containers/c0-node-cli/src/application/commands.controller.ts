import { cli } from "../system/cli/cli.adapter.ts";
import type { Command } from "../system/cli/command.type.ts";
import { ipApiCommand } from "./ip-api.command.ts";

export const commandsController = {
	runParsedCommand: async () => {
		const command: Command = cli.getCommandOptions({
			useCache: { type: "boolean", default: true },
		});

		switch (command.name) {
			case "ip": {
				await ipApiCommand.run({ useCache: true });
				break;
			}
			default: {
				throw new Error(`Command ${JSON.stringify(command)} not processable`);
			}
		}
	},
};
