import { jsonUtils } from "../system/json.utils.ts";
import { log } from "../system/log/log.singleton.ts";

const CACHE_EXPIRATION = 3600000; // 1 hour

type CacheEntry<T> = {
	value: T;
	timestamp: number;
};

export const cacheUtils = {
	save: async <T>(key: string, value: T) => {
		const data = buildCacheEntry(key, value);
		const path = getCachePath(key);
		try {
			await jsonUtils.writeToFile(path, data);
			log.debug(`Saved cache for key ${key}`, data);
		} catch (error) {
			log.warn(`Could not save cache for key ${key}`, error);
		}
	},
	load: async <T>(key: string): Promise<T | undefined> => {
		try {
			const path = getCachePath(key);
			const entry = await jsonUtils.readFromFile<CacheEntry<T>>(path);
			if (isCacheExpired(entry)) {
				log.debug(`Cache for key ${key} expired`, entry);
				await jsonUtils.deleteFile(path);
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

function getCachePath(key: string): string {
	return `./cache/${key}.json`;
}

function buildCacheEntry<T>(key: string, value: T): CacheEntry<T> {
	return {
		value,
		timestamp: Date.now(),
	};
}

function isCacheExpired(entry: CacheEntry<unknown>): boolean {
	return entry.timestamp + CACHE_EXPIRATION < Date.now();
}
