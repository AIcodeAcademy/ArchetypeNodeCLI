// A module to handle the environment variables

import { DEFAULT_ENV, type Env } from "./env.type.ts";

export const env = (): Env => {
	let nodeEnv = process.env.NODE_ENV as "development" | "production";
	if (!nodeEnv || (nodeEnv !== "development" && nodeEnv !== "production")) {
		nodeEnv = DEFAULT_ENV.NODE_ENV;
	}
	let configFile = process.env.CONFIG_FILE as string;
	if (!configFile) {
		configFile = DEFAULT_ENV.configFile;
	}

	return {
		...DEFAULT_ENV,
		NODE_ENV: nodeEnv,
		path: process.cwd(),
		configFile,
		isProduction: nodeEnv === "production",
	} as const;
};
