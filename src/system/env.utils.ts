/**
 * Environment variables access utility with type safety and validation
 */

import {
	DEFAULT_ENV_CONFIG,
	EnvVarConfig,
	EnvVarError,
	EnvVarValidator,
} from "./env.type.ts";

/**
 * High-level environment variable access functions exposed for external use
 */
export {
	getOptionalBooleanEnvVar,
	getOptionalEnvVar,
	getOptionalNumberEnvVar,
	getRequiredBooleanEnvVar,
	getRequiredEnvVar,
	getRequiredNumberEnvVar,
	isEnvVarError,
};

/**
 * Creates an error for a missing required environment variable
 */
const createMissingEnvVarError = (varName: string): EnvVarError => ({
	type: "ENV_VAR_ERROR",
	message: `Required environment variable ${varName} is not set`,
	varName,
});

/**
 * Retrieves an environment variable with strict type validation
 */
const getEnvVarWithValidator = <T>(
	varName: string,
	validator: EnvVarValidator<T>,
	defaultValue?: T,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): T | EnvVarError => {
	const value = process.env[varName];

	if (value === undefined) {
		if (defaultValue !== undefined) {
			return defaultValue;
		}
		const error = createMissingEnvVarError(varName);

		if (config.logWarnings) {
			console.warn(error.message);
		}

		if (config.throwOnError) {
			throw new Error(error.message);
		}

		return error;
	}

	try {
		return validator(value);
	} catch (error) {
		const envError: EnvVarError = {
			type: "ENV_VAR_ERROR",
			message: `Invalid environment variable ${varName}: ${(error as Error).message}`,
			varName,
		};

		if (config.logWarnings) {
			console.warn(envError.message);
		}

		if (config.throwOnError) {
			throw new Error(envError.message);
		}

		return envError;
	}
};

/**
 * Checks if a result is an EnvVarError
 */
const isEnvVarError = (result: unknown): result is EnvVarError =>
	typeof result === "object" &&
	result !== null &&
	"type" in result &&
	result.type === "ENV_VAR_ERROR";

/**
 * Gets a required environment variable as string
 */
const getRequiredEnvVar = (
	varName: string,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): string | EnvVarError =>
	getEnvVarWithValidator(varName, (value) => value, undefined, config);

/**
 * Gets an optional environment variable as string with a default value
 */
const getOptionalEnvVar = (
	varName: string,
	defaultValue: string,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): string => {
	const result = getEnvVarWithValidator(
		varName,
		(value) => value,
		defaultValue,
		config,
	);
	return isEnvVarError(result) ? defaultValue : result;
};

/**
 * Validates that a value is a number
 */
const validateNumber = (value: string): number => {
	const num = Number(value);
	if (Number.isNaN(num)) {
		throw new Error("Not a valid number");
	}
	return num;
};

/**
 * Gets a required environment variable as number
 */
const getRequiredNumberEnvVar = (
	varName: string,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): number | EnvVarError =>
	getEnvVarWithValidator(varName, validateNumber, undefined, config);

/**
 * Gets an optional environment variable as number with a default value
 */
const getOptionalNumberEnvVar = (
	varName: string,
	defaultValue: number,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): number => {
	const result = getEnvVarWithValidator(
		varName,
		validateNumber,
		defaultValue,
		config,
	);
	return isEnvVarError(result) ? defaultValue : result;
};

/**
 * Validates that a value is a boolean
 */
const validateBoolean = (value: string): boolean => {
	const lowered = value.toLowerCase();
	if (lowered === "true" || lowered === "1" || lowered === "yes") return true;
	if (lowered === "false" || lowered === "0" || lowered === "no") return false;
	throw new Error("Not a valid boolean value");
};

/**
 * Gets a required environment variable as boolean
 */
const getRequiredBooleanEnvVar = (
	varName: string,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): boolean | EnvVarError =>
	getEnvVarWithValidator(varName, validateBoolean, undefined, config);

/**
 * Gets an optional environment variable as boolean with a default value
 */
const getOptionalBooleanEnvVar = (
	varName: string,
	defaultValue: boolean,
	config: EnvVarConfig = DEFAULT_ENV_CONFIG,
): boolean => {
	const result = getEnvVarWithValidator(
		varName,
		validateBoolean,
		defaultValue,
		config,
	);
	return isEnvVarError(result) ? defaultValue : result;
};
