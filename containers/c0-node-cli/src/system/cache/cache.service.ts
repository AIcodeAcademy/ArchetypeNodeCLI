import { env } from "../env/env.adapter.ts";
import { file } from "../file/file.adapter.ts";
import {
	type CacheConfig,
	type CacheRepository,
	DEFAULT_CACHE_CONFIG,
} from "./cache-config.type.ts";
import type { CacheEntry } from "./cache-entry.type.ts";

export const cache = {
	async save<T>(key: string, value: T, config?: Partial<CacheConfig>) {
		const cacheConfig = getCacheConfig(config);
		const cacheEntry: CacheEntry<T> = {
			key,
			value,
			timestamp: Date.now(),
		};
		if (cacheConfig.repository === "memory") {
			saveMemory<T>(cacheEntry);
		} else if (cacheConfig.repository === "file") {
			await saveFile<T>(cacheEntry, cacheConfig.directory);
		}
	},
	async get<T>(key: string, config?: CacheConfig): Promise<T | undefined> {
		const cacheConfig = getCacheConfig(config);
		let cacheEntry: CacheEntry<T> | undefined;
		if (cacheConfig.repository === "memory") {
			cacheEntry = getMemory<T>(key);
		} else if (cacheConfig.repository === "file") {
			cacheEntry = await getFile<T>(key, cacheConfig.directory);
		}
		if (!cacheEntry) return undefined;
		if (isExpired(cacheEntry, stringToMs(cacheConfig.ttl))) {
			return undefined;
		}
		return cacheEntry.value;
	},
};

// ToDo: take config to its own file

let cacheConfig: CacheConfig | undefined = undefined;

function getCacheConfig(partialConfig?: Partial<CacheConfig>): CacheConfig {
	if (partialConfig) {
		cacheConfig = Object.assign(DEFAULT_CACHE_CONFIG, partialConfig);
		return cacheConfig;
	}
	if (cacheConfig) return cacheConfig;
	const envEntries = env.getEntries("CACHE_");
	if (envEntries.length === 0) {
		return DEFAULT_CACHE_CONFIG;
	}
	// ToDo: extract and simplify
	const envConfig: Partial<CacheConfig> = {};
	const envTtl = envEntries.find(([key]) => key.includes("TTL"))?.[1];
	if (envTtl) {
		envConfig.ttl = stringToMs(envTtl);
	}
	const envRepository = envEntries.find(([key]) =>
		key.includes("REPOSITORY"),
	)?.[1] as CacheRepository;
	if (envRepository) {
		envConfig.repository = envRepository;
	}
	const envDirectory = envEntries.find(([key]) =>
		key.includes("DIRECTORY"),
	)?.[1];
	if (envDirectory) {
		envConfig.directory = envDirectory;
	}
	cacheConfig = Object.assign(DEFAULT_CACHE_CONFIG, envConfig);
	return cacheConfig;
}

function isExpired(cacheEntry: CacheEntry<unknown>, ttl: number) {
	return cacheEntry.timestamp + ttl < Date.now();
}

function stringToMs(source: string | number): number {
	try {
		if (typeof source === "number") return source;
		// 1d, 1h, 1m, 1s
		const value = Number.parseInt(source[0]);
		const unit = source[1].toLowerCase();
		switch (unit) {
			case "d":
				return value * 1000 * 60 * 60 * 24;
			case "h":
				return value * 1000 * 60 * 60;
			case "m":
				return value * 1000 * 60;
			case "s":
				return value * 1000;
			default:
				return value * 1000;
		}
	} catch (error) {
		return Number(DEFAULT_CACHE_CONFIG.ttl);
	}
}

// ToDo: take memory and file to its own files

const cacheMemory = new Map<string, CacheEntry<unknown>>();

function saveMemory<T>(cacheEntry: CacheEntry<T>) {
	cacheMemory.set(cacheEntry.key, cacheEntry);
}
function getMemory<T>(key: string): CacheEntry<T> | undefined {
	const cacheEntry = cacheMemory.get(key) as CacheEntry<T> | undefined;
	if (!cacheEntry) return undefined;
	return cacheEntry;
}

async function saveFile<T>(cacheEntry: CacheEntry<T>, directory: string) {
	try {
		const path = `${directory}/${cacheEntry.key}.cache.json`;
		await file.writeJson(path, cacheEntry);
	} catch (error) {}
}

async function getFile<T>(
	key: string,
	directory: string,
): Promise<CacheEntry<T> | undefined> {
	try {
		const path = `${directory}/${key}.cache.json`;
		return await file.readJson<CacheEntry<T>>(path);
	} catch (error) {
		return undefined;
	}
}
