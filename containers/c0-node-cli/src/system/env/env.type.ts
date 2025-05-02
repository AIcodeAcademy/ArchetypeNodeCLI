export type Environment = "development" | "production" | "test";

export type Env = {
	NODE_ENV: Environment;
	APP_NAME: string;
	CONFIG_FILE: string;
	path: string;
	isProduction: boolean;
};

export const DEFAULT_ENV: Env = {
	NODE_ENV: "development",
	APP_NAME: "c0-node-cli",
	CONFIG_FILE: "config.json",
	path: ".",
	isProduction: false,
};
