import { parseArgs } from "node:util";
import { getLog } from "../system/log/log.singleton.ts";

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
	getLog().info(`Parsed arguments: ${JSON.stringify(parsedArgs)}`);
	return parsedArgs;
};

// ToDo: parseArgs adapter
// ToDo: command option real syntax
