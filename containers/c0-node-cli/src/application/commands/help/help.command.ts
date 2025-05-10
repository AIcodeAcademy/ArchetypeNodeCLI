import type { CommandHandler } from "../../shared/cli/command-handler.interface.ts";
import { styleTextAdapter } from "../../shared/utils/style-text.adapter.ts";

/**
 * Help command implementation.
 * Displays available commands and their usage instructions.
 */
export const helpCommand: CommandHandler<Record<string, unknown>> = {
	/** No parsing options needed for help command */
	parseOptions: {},
	/**
	 * Displays help information about available commands.
	 * @async
	 * @returns {Promise<void>}
	 */
	async run() {
		const helpMessage = styleTextAdapter.styleText(
			["blue"],
			["bold"],
			"Help command",
		);
		console.log(helpMessage);
		const availableCommandsMessage = styleTextAdapter.styleText(
			["blue"],
			[],
			"Available commands:",
		);
		console.log(availableCommandsMessage);
		const ipCommandMessage = styleTextAdapter.styleText(
			["blue"],
			[],
			"  - get your current ip:",
		);
		const ipCommandMessageWithSample = styleTextAdapter.styleText(
			["blue"],
			["italic"],
			"node src/main.ts ip",
		);
		console.log(`${ipCommandMessage} ${ipCommandMessageWithSample}`);
		const helpCommandMessage = styleTextAdapter.styleText(
			["blue"],
			[],
			"  - see this help:",
		);
		const helpCommandMessageWithSample = styleTextAdapter.styleText(
			["blue"],
			["italic"],
			"node src/main.ts help",
		);
		console.log(`${helpCommandMessage} ${helpCommandMessageWithSample}`);
	},
};
