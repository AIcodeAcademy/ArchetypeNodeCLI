/**
 * Environment configuration.
 */
export type Env = {
	environment: string;
	name: string;
	path: string;
	isProduction: boolean;
};

/**
 * Default environment values.
 */
export const DEFAULT_ENV: Env = {
	environment: "production",
	name: "c0-node-cli",
	path: ".",
	isProduction: true,
};
