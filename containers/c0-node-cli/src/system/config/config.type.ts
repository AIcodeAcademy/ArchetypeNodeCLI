import {
	type CacheConfig,
	DEFAULT_CACHE_CONFIG,
} from "../cache/cache-config.type.ts";
import { DEFAULT_LOG_CONFIG, type LogConfig } from "../log/log-config.type.ts";

export type Config = {
	log: LogConfig;
	cache: CacheConfig;
};

export const DEFAULT_CONFIG: Config = {
	log: DEFAULT_LOG_CONFIG,
	cache: DEFAULT_CACHE_CONFIG,
};
