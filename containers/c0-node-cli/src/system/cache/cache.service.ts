import { file } from "../file/file.adapter.ts";
import { type CacheConfig, DEFAULT_CACHE_CONFIG } from "./cache-config.type.ts";
import type { CacheEntry } from "./cache-entry.type.ts";

export const cache = {
	async save<T>(
		key: string,
		value: T,
		config: CacheConfig = DEFAULT_CACHE_CONFIG,
	) {
		const cacheEntry: CacheEntry<T> = {
			key,
			value,
			timestamp: Date.now(),
		};
		if (config.repository === "memory") {
			saveMemory<T>(cacheEntry);
		} else if (config.repository === "file") {
			await saveFile<T>(cacheEntry, config.directory);
		}
	},
	async get<T>(
		key: string,
		config: CacheConfig = DEFAULT_CACHE_CONFIG,
	): Promise<T | undefined> {
		let cacheEntry: CacheEntry<T> | undefined;
		if (config.repository === "memory") {
			cacheEntry = getMemory<T>(key);
		} else if (config.repository === "file") {
			cacheEntry = await getFile<T>(key, config.directory);
		}
		if (!cacheEntry) return undefined;
		if (isExpired(cacheEntry, config.ttl)) {
			return undefined;
		}
		return cacheEntry.value;
	},
};

function isExpired(cacheEntry: CacheEntry<unknown>, ttl: number) {
	return cacheEntry.timestamp + ttl < Date.now();
}

const cacheMemory = new Map<string, CacheEntry<unknown>>();

function saveMemory<T>(cacheEntry: CacheEntry<T>) {
	cacheMemory.set(cacheEntry.key, cacheEntry);
}
function getMemory<T>(key: string): CacheEntry<T> | undefined {
	const cacheEntry = cacheMemory.get(key) as CacheEntry<T> | undefined;
	if (!cacheEntry) return undefined;
	return cacheEntry;
}

async function saveFile<T>(cacheEntry: CacheEntry<T>, directory: string) {
	const path = `${directory}/${cacheEntry.key}.cache.json`;
	await file.writeJson(path, cacheEntry);
}

async function getFile<T>(
	key: string,
	directory: string,
): Promise<CacheEntry<T> | undefined> {
	const path = `${directory}/${key}.cache.json`;
	return await file.readJson<CacheEntry<T>>(path);
}
