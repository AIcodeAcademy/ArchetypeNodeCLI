import { parseArgs } from "node:util";
import { Log } from "../system/log/log.service.ts";

export const parseCommands = () => {
	const args = process.argv.slice(2);
	const { positionals, values } = parseArgs({
		args,
		options: {
			name: {
				type: "string",
				short: "n",
				default: "world",
			},
		},
		allowPositionals: true,
	});
	const command = positionals[0];
	const parsedArgs = { command, options: values };
	Log().info(`Parsed arguments: ${JSON.stringify(parsedArgs)}`);
	return parsedArgs;
};
