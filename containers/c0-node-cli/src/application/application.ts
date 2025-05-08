import { environment } from "../shared/env/env.adapter.ts";
import type { Env } from "../shared/env/env.type.ts";
import { log } from "../shared/log/log.service.ts";
import { commandsController } from "./commands.controller.ts";

export async function init() {
	const appEnv: Env = environment.get();
	const initMessage = `App ${appEnv.name} is running in ${appEnv.environment} environment`;
	log.warn(initMessage);

	try {
		await commandsController.runParsedCommand();
	} catch (error) {
		log.error(error);
	}

	// ToDo:
	// - Feature: process command line arguments
	//   - add help command and call it as default
	// - Feature: get weather forecast
}
