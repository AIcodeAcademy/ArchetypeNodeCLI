import { cache } from "./system/cache/cache.service.ts";
import { env } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";
import { temp } from "./temp.ts";

const environment = env.get();
cache.save<Env>("environment", environment, environment.cacheConfig);
const cachedEnvironment = await cache.get<Env>(
	"environment",
	environment.cacheConfig,
);
console.log("cachedEnvironment", cachedEnvironment);
temp(environment.cacheConfig);
// wait 2 seconds
await new Promise((resolve) => setTimeout(resolve, 2000));
const cachedEnvironment2 = await cache.get<Env>(
	"environment",
	environment.cacheConfig,
);
console.log("cachedEnvironment2", cachedEnvironment2);
