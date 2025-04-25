export type Env = {
	NODE_ENV: "development" | "production";
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
