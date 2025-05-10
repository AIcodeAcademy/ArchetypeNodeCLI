import { cacheConfigBuilder } from "./cache-config.builder.ts";
import type { CacheConfig } from "./cache-config.type.ts";
import type { CacheEntry } from "./cache-entry.type.ts";
import { cacheFileRepository } from "./cache-file.repository.ts";
import { cacheMemoryRepository } from "./cache-memory.repository.ts";
import type { CacheRepository } from "./cache-repository.interface.ts";

/**
 * Cache service for storing and retrieving data.
 * Provides methods for setting and getting cached values.
 */
export const cache = {
	/**
	 * Sets a value in the cache.
	 * @param key - The key to set the value for.
	 * @param value - The value to set in the cache.
	 * @param config - Optional configuration for the cache.
	 */
	async set<T>(key: string, value: T, config?: Partial<CacheConfig>) {
		const cacheEntry = buildCacheEntry(key, value);
		const cacheConfig = cacheConfigBuilder.build(config);
		const repository = createRepositoryFactory(cacheConfig);
		await repository.set<T>(cacheEntry, cacheConfig.directory);
	},
	/**
	 * Gets a value from the cache.
	 * @param key - The key to get the value for.
	 * @param config - Optional configuration for the cache.
	 * @returns The value from the cache or undefined if it does not exist.
	 */
	async get<T>(key: string, config?: CacheConfig): Promise<T | undefined> {
		const cacheConfig = cacheConfigBuilder.build(config);
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
