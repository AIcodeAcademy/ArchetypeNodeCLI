export type CacheEntry<T> = {
	key: string;
	value: T;
	timestamp: number;
};
