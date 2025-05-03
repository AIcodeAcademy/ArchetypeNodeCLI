import type { CacheConfig } from "./system/cache/cache-config.type";
import { cache } from "./system/cache/cache.service.ts";
import type { Env } from "./system/env/env.type.ts";

// For testing purposes

export async function temp(cacheConfig: CacheConfig) {
	const env = await cache.get<Env>("environment", cacheConfig);
	console.log("env from cache at temp", env);
}
