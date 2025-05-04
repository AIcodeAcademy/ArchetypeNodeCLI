import { cache } from "./system/cache/cache.service.ts";
import { env } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";

const environment = env.get();
cache.set("environment", environment);
const cachedEnvironment = await cache.get<Env>("environment");
console.log("cachedEnvironment", cachedEnvironment);
// wait 2 seconds
await new Promise((resolve) => setTimeout(resolve, 2000));
const cachedEnvironment2 = await cache.get<Env>("environment");
console.log("cachedEnvironment2", cachedEnvironment2);
// wait 1 more second
await new Promise((resolve) => setTimeout(resolve, 1000));
const cachedEnvironment3 = await cache.get<Env>("environment");
console.log("cachedEnvironment3", cachedEnvironment3);
