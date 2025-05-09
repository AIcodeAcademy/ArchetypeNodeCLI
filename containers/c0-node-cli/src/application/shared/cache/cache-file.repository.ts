import { file } from "../file/file.adapter.ts";
import type { CacheEntry } from "./cache-entry.type.ts";
import type { CacheRepository } from "./cache-repository.interface.ts";

export const cacheFileRepository: CacheRepository = {
	async get<T>(
		key: string,
		directory: string,
	): Promise<CacheEntry<T> | undefined> {
		try {
			const path = `${directory}/${key}.cache.json`;
			return await file.readJson<CacheEntry<T>>(path);
		} catch (error) {
			return undefined;
		}
	},
	async set<T>(cacheEntry: CacheEntry<T>, directory: string) {
		try {
			const path = `${directory}/${cacheEntry.key}.cache.json`;
			await file.writeJson(path, cacheEntry);
		} catch (error) {}
	},
};
