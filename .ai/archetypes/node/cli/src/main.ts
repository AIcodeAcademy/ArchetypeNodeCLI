import { getEnv } from "./system/env.util.ts";
import { DEFAULT_LOG_CONFIG } from "./system/log/log-config.type.ts";
import { createLogger } from "./system/log/log.util.ts";

const log = createLogger(DEFAULT_LOG_CONFIG);

log.debug("A message to help you while debugging", getEnv());
log.info("A message of any normal operation", getEnv());
log.warn("A message of an important event", getEnv());
log.error("A message of an exceptional event", getEnv());
