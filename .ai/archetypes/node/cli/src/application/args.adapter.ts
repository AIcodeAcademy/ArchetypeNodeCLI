import { parseArgs } from "node:util";
import { getLog } from "../system/log/log.utils.ts";

export type CommandOptions = {
	command: string;
	options: {
		cache: boolean;
	};
};

export const parseCommand = (): CommandOptions => {
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
	getLog().info(`Parsed command options: ${JSON.stringify(commandOptions)}`);
	return commandOptions;
};
