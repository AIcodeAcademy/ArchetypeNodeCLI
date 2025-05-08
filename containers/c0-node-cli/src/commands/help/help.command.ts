import type { CommandHandler } from "../../shared/cli/command-handler.interface.ts";
import { styleTextAdapter } from "../../shared/utils/style-text.adapter.ts";
export const helpCommand: CommandHandler = {
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
