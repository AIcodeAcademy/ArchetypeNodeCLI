/**
 * Type of cache repository.
 */
export type CacheRepositoryType = "file" | "memory";

/**
 * Configuration for the cache.
 */
export type CacheConfig = {
	ttl: number;
	repository: CacheRepositoryType;
	directory: string;
};

/**
 * Default cache configuration.
 */
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
	ttl: 1000 * 60 * 60 * 24, // 1 day
	repository: "memory",
	directory: "./cache",
};
