import {
	type CacheConfig,
	DEFAULT_CACHE_CONFIG,
} from "../cache/cache-config.type.ts";

export type Env = {
	appEnvironment: string;
	appName: string;
	appPath: string;
	isProduction: boolean;
	cacheConfig: CacheConfig;
};

export const DEFAULT_ENV: Env = {
	appEnvironment: "development",
	appName: "c0-node-cli",
	appPath: ".",
	isProduction: false,
	cacheConfig: DEFAULT_CACHE_CONFIG,
};
