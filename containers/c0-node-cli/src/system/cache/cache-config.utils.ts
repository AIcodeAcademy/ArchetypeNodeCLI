import { env } from "../env/env.adapter.ts";
import {
	type CacheConfig,
	type CacheRepositoryType,
	DEFAULT_CACHE_CONFIG,
} from "./cache-config.type.ts";

let cacheConfig: CacheConfig | undefined = undefined;

export function getCacheConfig(
	partialConfig?: Partial<CacheConfig>,
): CacheConfig {
	if (partialConfig) {
		cacheConfig = Object.assign(DEFAULT_CACHE_CONFIG, partialConfig);
	}
	if (!cacheConfig) {
		cacheConfig = getCacheConfigFromEnv();
	}
	return cacheConfig;
}

function getCacheConfigFromEnv(): CacheConfig {
	const PREFIX = "CACHE_";
	const envEntries: Map<string, string | undefined> = env.getEntries(PREFIX);
	if (envEntries.size === 0) {
		return DEFAULT_CACHE_CONFIG;
	}
	const envConfig: Partial<CacheConfig> = {};
	const envTtl = envEntries.get(`${PREFIX}TTL`);
	if (envTtl) {
		envConfig.ttl = stringToMs(envTtl);
	}
	const envRepository = envEntries.get(`${PREFIX}REPOSITORY`);
	if (envRepository) {
		envConfig.repository = envRepository as CacheRepositoryType;
	}
	const envDirectory = envEntries.get(`${PREFIX}DIRECTORY`);
	if (envDirectory) {
		envConfig.directory = envDirectory;
	}
	return Object.assign(DEFAULT_CACHE_CONFIG, envConfig);
}

function stringToMs(source: string | number): number {
	try {
		if (typeof source === "number") return source;
		// 1d, 1h, 1m, 1s
		const value = Number.parseInt(source[0]);
		const unit = source[1].toLowerCase();
		switch (unit) {
			case "d":
				return value * 1000 * 60 * 60 * 24;
			case "h":
				return value * 1000 * 60 * 60;
			case "m":
				return value * 1000 * 60;
			case "s":
				return value * 1000;
			default:
				return value * 1000;
		}
	} catch (error) {
		return Number(DEFAULT_CACHE_CONFIG.ttl);
	}
}
