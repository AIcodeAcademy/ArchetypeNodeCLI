const DEFAULT_EXPIRATION = 3600000; // 1 hour

export type CacheConfig = {
	expiration: number;
	cacheDir: string;
};

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
	expiration: DEFAULT_EXPIRATION,
	cacheDir: "",
};
