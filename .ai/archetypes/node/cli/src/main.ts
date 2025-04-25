import { readConfig } from "./system/config/config.repository.ts";
import { getEnv } from "./system/env/env.util.ts";
import { createLogger } from "./system/log/log.util.ts";

const env = getEnv();
const config = await readConfig(env.CONFIG_FILE);
const log = createLogger(config.log);

log.debug("A message to help you while debugging", getEnv());
log.info("A message of any normal operation", getEnv());
log.warn("A message of an important event", getEnv());
log.error("A message of an exceptional event", getEnv());
