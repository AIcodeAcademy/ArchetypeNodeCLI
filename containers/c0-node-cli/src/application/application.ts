import { helpCommand } from "./commands/help/help.command.ts";
import { ipApiCommand } from "./commands/ip-api/api/ip-api.command.ts";
import { commandsController } from "./shared/cli/commands.controller.ts";
import { environment } from "./shared/env/env.adapter.ts";
import type { Env } from "./shared/env/env.type.ts";
import { log } from "./shared/log/log.service.ts";

/**
 * Main application object that orchestrates the CLI application.
 * Handles initialization, command registration, and execution.
 */
export const application = {
	/**
	 * Initializes the application, sets up environment, and registers commands.
	 * @throws {Error} If command registration or execution fails
	 */
	async init() {
		const appEnv: Env = environment.get();
		const initMessage = `App ${appEnv.name} is running in ${appEnv.environment} environment`;
		log.warn(initMessage);

		try {
			commandsController.addCommand("help", helpCommand);
			commandsController.addCommand("ip", ipApiCommand);
			await commandsController.runParsedCommand();
		} catch (error) {
			log.error(error);
		}
	},
};
