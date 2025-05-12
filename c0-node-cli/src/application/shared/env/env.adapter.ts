import { DEFAULT_ENV, type Env } from "./env.type.ts";

/**
 * Environment adapter for getting environment variables.
 */
export const environment = {
	/**
	 * Gets the environment configuration.
	 * @returns The environment configuration.
	 */
	get(): Env {
		const env = { ...DEFAULT_ENV };
		env.environment = process.env.APP_ENVIRONMENT || DEFAULT_ENV.environment;
		env.name = process.env.APP_NAME || DEFAULT_ENV.name;
		env.path = process.env.APP_PATH || DEFAULT_ENV.path;
		env.isProduction = env.environment === "production";
		return Object.freeze(env);
	},
	/**
	 * Gets an environment variable.
	 * @param key - The key to get the value for.
	 * @returns The value of the environment variable.
	 */
	getEntry(key: string): string | string[] | undefined {
		const value = process.env[key];
		if (value) {
			return value.split(",");
		}
		return undefined;
	},
	/**
	 * Gets all environment variables that start with a prefix.
	 * @param prefix - The prefix to filter the environment variables by.
	 * @returns A map of environment variables that start with the prefix.
	 */
	getEntries(prefix: string): Map<string, string | undefined> {
		return new Map(
			Object.entries(process.env).filter(([key]) => key.startsWith(prefix)),
		);
	},
};
