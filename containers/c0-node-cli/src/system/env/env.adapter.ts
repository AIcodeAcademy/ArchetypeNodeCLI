import type { Env, Environment } from "./env.type.ts";
import { DEFAULT_ENV } from "./env.type.ts";

export const envAdapter = {
	getEnv: (): Env => {
		const nodeEnv = process.env.NODE_ENV;
		const appName = process.env.APP_NAME;
		const configFile = process.env.CONFIG_FILE;
		return buildEnv(nodeEnv, appName, configFile);
	},
};

function buildEnv(
	nodeEnv?: string,
	appName?: string,
	configFile?: string,
): Env {
	return {
		...DEFAULT_ENV,
		NODE_ENV: getEnvironment(nodeEnv) || DEFAULT_ENV.NODE_ENV,
		APP_NAME: appName || DEFAULT_ENV.APP_NAME,
		CONFIG_FILE: configFile || DEFAULT_ENV.CONFIG_FILE,
		path: process.cwd(),
		isProduction: nodeEnv === "production",
	} as const;
}

function getEnvironment(nodeEnv?: string): Environment | undefined {
	if (!nodeEnv) {
		return undefined;
	}
	if (["development", "production", "test"].includes(nodeEnv)) {
		return nodeEnv as Environment;
	}
	return undefined;
}
