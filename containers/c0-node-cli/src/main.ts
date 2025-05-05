import { cache } from "./system/cache/cache.service.ts";
import { environment } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";
import { log } from "./system/log/log.service.ts";

const env = environment.get();
log.warn("environment", env, "main");
cache.set("environment", env);
const cachedEnvironment = await cache.get<Env>("environment");
log.info("cachedEnvironment", cachedEnvironment);
// wait 2 seconds
await new Promise((resolve) => setTimeout(resolve, 2000));
const cachedEnvironment2 = await cache.get<Env>("environment");
log.info("cachedEnvironment2", cachedEnvironment2);
// wait 1 more second
await new Promise((resolve) => setTimeout(resolve, 1000));
const cachedEnvironment3 = await cache.get<Env>("environment");
log.error("cachedEnvironment3", cachedEnvironment3);
