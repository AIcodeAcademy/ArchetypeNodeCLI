/**
 * Type definitions for environment variable utilities
 */

/**
 * Error thrown when a required environment variable is missing or invalid
 */
export type EnvVarError = {
	type: "ENV_VAR_ERROR";
	message: string;
	varName: string;
};

/**
 * Validator function type for environment variables
 */
export type EnvVarValidator<T> = (value: string) => T;

/**
 * Configuration for environment variable access
 */
export type EnvVarConfig = {
	/**
	 * Whether to throw errors when variables are missing or invalid
	 * @default false
	 */
	throwOnError: boolean;

	/**
	 * Whether to log warnings for missing or invalid variables
	 * @default true
	 */
	logWarnings: boolean;
};

/**
 * Default configuration for environment variable access
 */
export const DEFAULT_ENV_CONFIG: EnvVarConfig = {
	throwOnError: false,
	logWarnings: true,
};
