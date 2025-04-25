export type Env = {
	NODE_ENV: "development" | "production";
	path: string;
	configFile: string;
	isProduction: boolean;
};

export const DEFAULT_ENV: Env = {
	NODE_ENV: "development",
	path: ".",
	configFile: "config.json",
	isProduction: false,
};
