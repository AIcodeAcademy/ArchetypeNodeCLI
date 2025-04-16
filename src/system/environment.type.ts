/**
 * Types for environment variables used in the CLI application.
 */

/**
 * Required environment variables.
 */
export interface RequiredEnvironment {
	APP_NAME: string;
	APP_ENV: "development" | "production" | "test";
	LOG_LEVEL: "info" | "warn" | "error" | "debug";
}

/**
 * Optional environment variables.
 */
export interface OptionalEnvironment {
	LOG_FILE?: string;
	LOG_COLORS?: "true" | "false";
	LOG_TIMESTAMPS?: "true" | "false";
	CUSTOM_API_KEY?: string;
	CUSTOM_API_URL?: string;
}

/**
 * Complete environment type.
 */
export type CliEnvironment = RequiredEnvironment & OptionalEnvironment;
