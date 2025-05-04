import { cache } from "./system/cache/cache.service.ts";
import { env } from "./system/env/env.adapter.ts";
import type { Env } from "./system/env/env.type.ts";
import { temp } from "./temp.ts";

const environment = env.get();
cache.save<Env>("environment", environment, {
	ttl: "1d",
	repository: "file",
	directory: "./temp/cache",
});
const cachedEnvironment = await cache.get<Env>("environment", {
	ttl: "1d",
	repository: "file",
	directory: "./temp/cache",
});
console.log("cachedEnvironment", cachedEnvironment);
temp({ ttl: "1d", repository: "file", directory: "./temp/cache" });
// wait 2 seconds
await new Promise((resolve) => setTimeout(resolve, 2000));
const cachedEnvironment2 = await cache.get<Env>("environment", {
	ttl: "1d",
	repository: "file",
	directory: "./temp/cache",
});
console.log("cachedEnvironment2", cachedEnvironment2);
