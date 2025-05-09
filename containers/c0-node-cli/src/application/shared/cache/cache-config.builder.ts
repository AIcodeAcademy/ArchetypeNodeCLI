import { log } from "../../shared/log/log.service.ts";
import { environment } from "../env/env.adapter.ts";
import { stringToMs } from "../utils/string.utils.ts";
import {
	type CacheConfig,
	type CacheRepositoryType,
	DEFAULT_CACHE_CONFIG,
} from "./cache-config.type.ts";

let cacheConfig: CacheConfig | undefined = undefined;

export const cacheConfigBuilder = {
	build(partialConfig?: Partial<CacheConfig>): CacheConfig {
		if (partialConfig) {
			cacheConfig = Object.assign(DEFAULT_CACHE_CONFIG, partialConfig);
		}
		if (!cacheConfig) {
			cacheConfig = getCacheConfigFromEnv();
		}
		log.debug("cacheConfig", cacheConfig);
		return cacheConfig;
	},
	set(partialConfig: Partial<CacheConfig>): void {
		cacheConfig = Object.assign(DEFAULT_CACHE_CONFIG, partialConfig);
	},
};

function getCacheConfigFromEnv(): CacheConfig {
	const PREFIX = "CACHE_";
	const envEntries: Map<string, string | undefined> =
		environment.getEntries(PREFIX);
	if (envEntries.size === 0) {
		return DEFAULT_CACHE_CONFIG;
	}
	const envConfig: Partial<CacheConfig> = {};
	const envTtl = envEntries.get(`${PREFIX}TTL`);
	if (envTtl) {
		envConfig.ttl = stringToMs(envTtl) ?? DEFAULT_CACHE_CONFIG.ttl;
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
