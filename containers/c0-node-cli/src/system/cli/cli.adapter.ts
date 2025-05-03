import { parseArgs } from "node:util";
import type { Command } from "./command.type.ts";

export const cli = {
	getCommandOptions: (options: any): Command => {
		const args: string[] | undefined = process.argv.slice(2);
		const { positionals, values } = parseArgs({
			args,
			options,
			allowPositionals: true,
		});
		const name: string = positionals[0] || "";
    const parsedOptions =  {};
    for (const key in values) {
        parsedOptions[key] = values[key];
      }
    const command: Command = { name, options: parsedOptions };
		return command;
	},
};
