export type Env = {
	appEnvironment: string;
	appName: string;
	appPath: string;
	isProduction: boolean;
};

export const DEFAULT_ENV: Env = {
	appEnvironment: "development",
	appName: "c0-node-cli",
	appPath: ".",
	isProduction: false,
};
