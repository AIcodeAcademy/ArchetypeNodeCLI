import { getEnv } from "./system/env.util.ts";
import { logConfig } from "./system/log.config.ts";
import { Log } from "./system/log.util.ts";

const log = new Log(logConfig);

log.debug("Debug message", getEnv());
log.info("Info message", getEnv());
log.warn("Warn message", getEnv());
log.error("Error message", getEnv());
