import { commandsController } from "./application/commands.controller.ts";
import { readConfig } from "./system/config/config.repository.ts";
import { envAdapter } from "./system/env/env.adapter.ts";
import { logBuilder } from "./system/log/log.singleton.ts";
main();

async function main() {
	await init();
	await commandsController.runParsedCommand();
}

async function init() {
	const env = envAdapter.getEnv();
	const config = await readConfig(env.CONFIG_FILE);
	const log = logBuilder(config.log);

	log.debug("Environment and log working", env);
}
