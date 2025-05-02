import type { Env, Environments } from "./env.type.ts";
import { DEFAULT_ENV } from "./env.type.ts";

export const envAdapter = {
	getEnv: () => {
		let nodeEnv = process.env.NODE_ENV;
		if (!nodeEnv || isInvalidEnvironment(nodeEnv)) {
			nodeEnv = DEFAULT_ENV.NODE_ENV;
		}
		let configFile = process.env.CONFIG_FILE as string;
		if (!configFile) {
			configFile = DEFAULT_ENV.CONFIG_FILE;
		}
		return buildEnv(nodeEnv, configFile);
	},
};

function isInvalidEnvironment(nodeEnv: string): boolean {
	return nodeEnv !== "development" && nodeEnv !== "production";
}

function buildEnv(nodeEnv: string, configFile: string): Env {
	return {
		...DEFAULT_ENV,
		NODE_ENV: nodeEnv as Environments,
		CONFIG_FILE: configFile,
		path: process.cwd(),
		isProduction: nodeEnv === "production",
	} as const;
}
