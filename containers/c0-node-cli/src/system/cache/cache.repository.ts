import { fsAdapter } from "../fs.adapter.ts";
import { jsonUtils } from "../json.utils.ts";
import { log } from "../log/log.singleton.ts";
import { type CacheConfig, DEFAULT_CACHE_CONFIG } from "./cache-config.type.ts";

type CacheEntry<T> = {
	value: T;
	timestamp: number;
};

let cacheConfig: CacheConfig = DEFAULT_CACHE_CONFIG;

export const cacheRepository = {
	init: (config: CacheConfig) => {
		cacheConfig = config;
	},
	save: async <T>(key: string, value: T) => {
		// ToDo: if dir empty, use memory cache
		const data = buildCacheEntry(key, value);
		const path = getCachePath(key, cacheConfig.cacheDir);
		try {
			await jsonUtils.writeToFile(path, data);
			log.debug(`Saved cache for key ${key}`, data);
		} catch (error) {
			log.warn(`Could not save cache for key ${key}`, error);
		}
	},
	load: async <T>(key: string): Promise<T | undefined> => {
		try {
			const path = getCachePath(key, cacheConfig.cacheDir);
			const entry = await jsonUtils.readFromFile<CacheEntry<T>>(path);
			if (isCacheExpired(entry, cacheConfig.expiration)) {
				log.debug(`Cache for key ${key} expired`, entry);
				await fsAdapter.deleteFile(path);
				return undefined;
			}
			log.debug(`Loaded cache for key ${key}`, entry.value);
			return entry.value;
		} catch (error) {
			log.warn(`Could not load cache for key ${key}`, error);
			return undefined;
		}
	},
};

function getCachePath(key: string, cacheDir: string): string {
	return `${cacheDir}/${key}.cache.json`;
}

function buildCacheEntry<T>(key: string, value: T): CacheEntry<T> {
	return {
		value,
		timestamp: Date.now(),
	};
}

function isCacheExpired(
	entry: CacheEntry<unknown>,
	expiration: number,
): boolean {
	return entry.timestamp + expiration < Date.now();
}
