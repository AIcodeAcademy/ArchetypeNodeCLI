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
	const parsedArgs = { command, options: values };
	getLog().info(`Parsed arguments: ${JSON.stringify(parsedArgs)}`);
	return parsedArgs;
};
