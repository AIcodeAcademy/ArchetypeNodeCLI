import { DEFAULT_ENV, type Env } from "./env.type.ts";

export const environment = {
	get(): Env {
		const env = { ...DEFAULT_ENV };
		env.environment = process.env.APP_ENVIRONMENT || DEFAULT_ENV.environment;
		env.name = process.env.APP_NAME || DEFAULT_ENV.name;
		env.path = process.env.APP_PATH || DEFAULT_ENV.path;
		env.isProduction = env.environment === "production";
		return Object.freeze(env);
	},
	getEntry(key: string): string | string[] | undefined {
		const value = process.env[key];
		if (value) {
			return value.split(",");
		}
		return undefined;
	},
	getEntries(prefix: string): Map<string, string | undefined> {
		return new Map(
			Object.entries(process.env).filter(([key]) => key.startsWith(prefix)),
		);
	},
};
