import { commandsController } from "./application/commands.controller.ts";
import { cacheRepository } from "./system/cache/cache.repository.ts";
import { configRepository } from "./system/config/config.repository.ts";
import { envAdapter } from "./system/env/env.adapter.ts";
import { configLog } from "./system/log/log.singleton.ts";
main();

async function main() {
	await init();
	await commandsController.runParsedCommand();
}

async function init() {
	const env = envAdapter.getEnv();
	const config = await configRepository.load(env.CONFIG_FILE);
	const log = configLog(config.log);
	cacheRepository.config(config.cache);
	// ToDo: http configuration
	log.debug("Environment and log working", env);
}
