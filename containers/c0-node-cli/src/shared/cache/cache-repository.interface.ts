import type { CacheEntry } from "./cache-entry.type";

export interface CacheRepository {
	get<T>(key: string, directory: string): Promise<CacheEntry<T> | undefined>;
	set<T>(cacheEntry: CacheEntry<T>, directory: string): Promise<void>;
}
