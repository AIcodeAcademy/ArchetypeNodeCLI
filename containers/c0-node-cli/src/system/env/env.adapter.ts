import type { CacheRepository } from "../cache/cache-config.type.ts";
import { DEFAULT_ENV, type Env } from "./env.type.ts";

export const env = {
	get(): Env {
		const env = { ...DEFAULT_ENV };
		env.appEnvironment =
			process.env.APP_ENVIRONMENT || DEFAULT_ENV.appEnvironment;
		env.appName = process.env.APP_NAME || DEFAULT_ENV.appName;
		env.appPath = process.env.APP_PATH || DEFAULT_ENV.appPath;
		env.isProduction = env.appEnvironment === "production";
		env.cacheConfig = {
			...DEFAULT_ENV.cacheConfig,
			repository:
				(process.env.CACHE_REPOSITORY as CacheRepository) ||
				DEFAULT_ENV.cacheConfig.repository,
			directory:
				process.env.CACHE_DIRECTORY || DEFAULT_ENV.cacheConfig.directory,
			ttl: process.env.CACHE_TTL
				? stringToMs(process.env.CACHE_TTL)
				: DEFAULT_ENV.cacheConfig.ttl,
		};
		return Object.freeze(env);
	},
};

function stringToMs(str: string) {
	// 1d, 1h, 1m, 1s
	const value = Number.parseInt(str[0]);
	const unit = str[1].toLowerCase();
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
}
