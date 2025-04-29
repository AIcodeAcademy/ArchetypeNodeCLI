export type Environments = "development" | "production";

export type Env = {
	NODE_ENV: Environments;
	CONFIG_FILE: string;
	path: string;
	isProduction: boolean;
};

export const DEFAULT_ENV: Env = {
	NODE_ENV: "development",
	CONFIG_FILE: "config.json",
	path: ".",
	isProduction: false,
};
