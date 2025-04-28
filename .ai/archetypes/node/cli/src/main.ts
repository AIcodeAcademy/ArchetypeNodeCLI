import { parseCommands } from "./application/args.utils.ts";
import { getMyMeteo } from "./domain/my-meteo.service.ts";
import { readConfig } from "./system/config/config.repository.ts";
import { getEnv } from "./system/env/env.adapter.ts";

import { initLog } from "./system/log/log.utils.ts";

const env = getEnv();
const config = await readConfig(env.CONFIG_FILE);
const log = initLog(config.log);

log.debug("A message to help you while debugging", getEnv());
log.info("A message of any normal operation", getEnv());
log.warn("A message of an important event", getEnv());
log.error("A message of an exceptional event", getEnv());

parseCommands();

try {
	const meteo = await getMyMeteo();
	log.info("My meteo", meteo);
} catch (error) {
	log.error("Error getting my meteo", error);
}
