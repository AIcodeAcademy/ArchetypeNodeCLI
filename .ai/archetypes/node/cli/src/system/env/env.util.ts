// A module to handle the environment variables

import { DEFAULT_ENV, type Env } from "./env.type.ts";

export const getEnv = (): Env => {
	let nodeEnv = process.env.NODE_ENV as "development" | "production";
	if (!nodeEnv || (nodeEnv !== "development" && nodeEnv !== "production")) {
		nodeEnv = DEFAULT_ENV.NODE_ENV;
	}
	let configFile = process.env.CONFIG_FILE as string;
	if (!configFile) {
		configFile = DEFAULT_ENV.CONFIG_FILE;
	}

	return {
		...DEFAULT_ENV,
		NODE_ENV: nodeEnv,
		CONFIG_FILE: configFile,
		path: process.cwd(),
		isProduction: nodeEnv === "production",
	} as const;
};
