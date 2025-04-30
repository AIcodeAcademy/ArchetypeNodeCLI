import { parseArgs } from "node:util";
import { log } from "../system/log/log.factory.ts";

export type CommandOptions = {
	command: string;
	options: {
		cache: boolean;
	};
};

export const args = {
	parseCommand: (): CommandOptions => {
		const args = process.argv.slice(2);
		const { positionals, values } = parseArgs({
			args,
			options: {
				cache: {
					type: "boolean",
					short: "c",
					default: false,
				},
			},
			allowPositionals: true,
		});
		const command = positionals[0];
		const options = values;
		const commandOptions = { command, options };
		log.info(`Parsed command options: ${JSON.stringify(commandOptions)}`);
		return commandOptions;
	},
};
