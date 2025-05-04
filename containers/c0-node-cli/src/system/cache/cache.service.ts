import type { CacheConfig } from "./cache-config.type.ts";
import { getCacheConfig } from "./cache-config.utils.ts";
import type { CacheEntry } from "./cache-entry.type.ts";
import { cacheFileRepository } from "./cache-file.repository.ts";
import { cacheMemoryRepository } from "./cache-memory.repository.ts";
import type { CacheRepository } from "./cache-repository.interface.ts";

export const cache = {
	async set<T>(key: string, value: T, config?: Partial<CacheConfig>) {
		const cacheEntry = buildCacheEntry(key, value);
		const cacheConfig = getCacheConfig(config);
		const repository = createRepositoryFactory(cacheConfig);
		await repository.set<T>(cacheEntry, cacheConfig.directory);
	},
	async get<T>(key: string, config?: CacheConfig): Promise<T | undefined> {
		const cacheConfig = getCacheConfig(config);
		const repository = createRepositoryFactory(cacheConfig);
		const cacheEntry = await repository.get<T>(key, cacheConfig.directory);
		return getValue(cacheEntry, cacheConfig.ttl);
	},
};

function buildCacheEntry<T>(key: string, value: T): CacheEntry<T> {
	const cacheEntry: CacheEntry<T> = {
		key,
		value,
		timestamp: Date.now(),
	};
	return cacheEntry;
}

function createRepositoryFactory(config: CacheConfig): CacheRepository {
	if (config.repository === "memory") {
		return cacheMemoryRepository;
	}
	return cacheFileRepository;
}

function getValue<T>(cacheEntry?: CacheEntry<T>, ttl?: number): T | undefined {
	if (!cacheEntry) return undefined;
	if (ttl && isExpired(cacheEntry, ttl)) {
		return undefined;
	}
	return cacheEntry.value;
}

function isExpired(cacheEntry: CacheEntry<unknown>, ttl: number) {
	return cacheEntry.timestamp + ttl < Date.now();
}
