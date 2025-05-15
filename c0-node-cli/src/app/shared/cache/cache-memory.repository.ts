import type { CacheEntry } from "./cache-entry.type.ts";
import type { CacheRepository } from "./cache-repository.interface.ts";

const cacheMemory = new Map<string, CacheEntry<unknown>>();

export const cacheMemoryRepository: CacheRepository = {
	async set<T>(cacheEntry: CacheEntry<T>) {
		cacheMemory.set(cacheEntry.key, cacheEntry);
	},
	async get<T>(key: string) {
		return cacheMemory.get(key) as CacheEntry<T> | undefined;
	},
};
