/**
 * Environment mode types and interfaces
 */

/**
 * Represents the possible environment modes
 */
export type EnvironmentMode = "development" | "production" | "test";

/**
 * Interface for environment configuration
 */
export interface EnvironmentConfig {
	/**
	 * Current environment mode
	 */
	mode: EnvironmentMode;

	/**
	 * Whether the environment is in development mode
	 */
	isDevelopment: boolean;

	/**
	 * Whether the environment is in production mode
	 */
	isProduction: boolean;

	/**
	 * Whether the environment is in test mode
	 */
	isTest: boolean;
}

/**
 * Default environment configuration
 */
export const DEFAULT_ENVIRONMENT_CONFIG: EnvironmentConfig = {
	mode: "development",
	isDevelopment: true,
	isProduction: false,
	isTest: false,
};
