export type CacheRepositoryType = "file" | "memory";
export type CacheConfig = {
	ttl: number;
	repository: CacheRepositoryType;
	directory: string;
};

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
	ttl: 1000 * 60 * 60 * 24, // 1 day
	repository: "memory",
	directory: "./cache",
};
