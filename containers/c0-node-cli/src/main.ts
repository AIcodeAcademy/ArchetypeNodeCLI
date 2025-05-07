import { ipApiCommand } from "./application/ip-api.command.ts";
import { environment } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";
import { log } from "./system/log/log.service.ts";

async function main() {
	const appEnv: Env = environment.get();
	const initMessage = `App ${appEnv.name} is running in ${appEnv.environment} environment`;
	log.warn(initMessage);

	try {
		await ipApiCommand.run({ useCache: true });
	} catch (error) {
		log.error(error);
	}

	// ToDo:
	// - Feature: process command line arguments
	//   - standardize command call
	//   - add help command and call it as default
	// - Feature: get weather forecast
}

main();
