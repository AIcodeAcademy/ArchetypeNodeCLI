import { getEnv } from "./system/env.util.ts";
import { logConfig } from "./system/log.config.ts";
import { createLogger } from "./system/log.factory.ts";

const log = createLogger(logConfig);

log.debug("Debug message", getEnv());
log.info("Info message", getEnv());
log.warn("Warn message", getEnv());
log.error("Error message", getEnv());
