import { z } from "zod";

/**
 * Environment variable types and validation schemas
 */

/**
 * Schema for validating environment variable names
 */
export const ENV_VAR_NAME_SCHEMA = z
	.string()
	.min(1, "Environment variable name cannot be empty")
	.regex(
		/^[A-Z_][A-Z0-9_]*$/,
		"Environment variable name must be uppercase with underscores",
	);

/**
 * Schema for validating environment variable values
 */
export const ENV_VAR_VALUE_SCHEMA = z
	.string()
	.min(1, "Environment variable value cannot be empty");

/**
 * Interface for an environment variable
 */
export interface EnvironmentVariable {
	/**
	 * Name of the environment variable
	 */
	name: string;

	/**
	 * Value of the environment variable
	 */
	value: string;

	/**
	 * Whether the variable is required
	 */
	required: boolean;

	/**
	 * Description of the variable
	 */
	description?: string;
}

/**
 * Schema for validating environment variables
 */
export const ENVIRONMENT_VARIABLE_SCHEMA = z.object({
	name: ENV_VAR_NAME_SCHEMA,
	value: ENV_VAR_VALUE_SCHEMA,
	required: z.boolean(),
	description: z.string().optional(),
});

/**
 * Type for a collection of environment variables
 */
export type EnvironmentVariables = Record<string, EnvironmentVariable>;

/**
 * Schema for validating a collection of environment variables
 */
export const ENVIRONMENT_VARIABLES_SCHEMA = z.record(
	ENV_VAR_NAME_SCHEMA,
	ENVIRONMENT_VARIABLE_SCHEMA,
);
