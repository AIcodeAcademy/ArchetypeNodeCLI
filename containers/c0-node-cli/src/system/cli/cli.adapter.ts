import { type ParseArgsOptionsConfig, parseArgs } from "node:util";
import type { Command } from "./command.type.ts";

export const cli = {
	getCommandOptions: (options: ParseArgsOptionsConfig): Command => {
		const args: string[] | undefined = process.argv.slice(2);
		const { positionals, values } = parseArgs({
			args,
			options,
			allowPositionals: true,
		});
		const name: string = positionals[0] || "";
		const parsedOptions = Object.assign({}, values);
		const command: Command = { name, options: parsedOptions };
		return command;
	},
};
