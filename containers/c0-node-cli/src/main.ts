import { ipApiCommand } from "./application/ip-api.command.ts";
import { environment } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";
import { log } from "./system/log/log.service.ts";

async function main() {
	const appEnv: Env = environment.get();
	log.warn(
		`App ${appEnv.name} is running in ${appEnv.environment} environment`,
	);

	try {
		await ipApiCommand.run({ useCache: true });
	} catch (error) {
		log.error(error.message, error, error.stack);
	}

	// ToDo:
	// - Feature: log
	//   - Improve error context and trace
	//   - Do it for any transporter
	//   - Add a log style for console
	// - Feature: get weather forecast
	// - Feature: process command line arguments
}

main();
