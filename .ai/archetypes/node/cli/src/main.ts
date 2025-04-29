import { commandsController } from "./application/commands.controller.ts";
import { readConfig } from "./system/config/config.repository.ts";
import { getEnv } from "./system/env/env.adapter.ts";

import { initLog } from "./system/log/log.utils.ts";

main();

async function main() {
	await init();
	await commandsController();
}

async function init() {
	const env = getEnv();
	const config = await readConfig(env.CONFIG_FILE);
	const log = initLog(config.log);

	log.debug("Environment and log working", getEnv());
}
