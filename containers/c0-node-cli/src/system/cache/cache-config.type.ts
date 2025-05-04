export type CacheRepository = "file" | "memory";
export type CacheConfig = {
	ttl: number | string;
	repository: CacheRepository;
	directory: string;
};

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
	ttl: 1000 * 60 * 60 * 24, // 1 day
	repository: "memory",
	directory: "./cache",
};
