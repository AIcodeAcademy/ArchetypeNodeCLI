import { DEFAULT_ENV, type Env } from "./env.type.ts";

// ToDo: rename as environment?

export const env = {
	get(): Env {
		const env = { ...DEFAULT_ENV };
		env.appEnvironment =
			process.env.APP_ENVIRONMENT || DEFAULT_ENV.appEnvironment;
		env.appName = process.env.APP_NAME || DEFAULT_ENV.appName;
		env.appPath = process.env.APP_PATH || DEFAULT_ENV.appPath;
		env.isProduction = env.appEnvironment === "production";
		return Object.freeze(env);
	},
	getEntries(prefix: string): [string, string | undefined][] {
		return Object.entries(process.env).filter(([key]) =>
			key.startsWith(prefix),
		);
	},
};
