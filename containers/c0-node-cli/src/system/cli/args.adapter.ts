import { parseArgs } from "node:util";
import type { Command } from "./command.type.ts";

export const cli = {
	getCommandOptions: (options: Record<string, unknown>): Command => {
		const args: unknown = process.argv.slice(2);
		const { positionals, values } = parseArgs({
			args,
			options,
			allowPositionals: true,
		});
		const name: string = positionals[0] || "";
		const command: Command = { name, options: values };
		return command;
	},
};
