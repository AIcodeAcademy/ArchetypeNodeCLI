/**
 * Environment variables access utility with type safety and validation
 */

/**
 * Error thrown when a required environment variable is missing
 */
export type EnvVarError = {
	type: "ENV_VAR_ERROR";
	message: string;
	varName: string;
};

/**
 * Creates an error for a missing required environment variable
 */
export const createMissingEnvVarError = (varName: string): EnvVarError => ({
	type: "ENV_VAR_ERROR",
	message: `Required environment variable ${varName} is not set`,
	varName,
});

/**
 * Validator function type for environment variables
 */
export type EnvVarValidator<T> = (value: string) => T;

/**
 * Retrieves an environment variable with strict type validation
 */
export const getEnvVarWithValidator = <T>(
	varName: string,
	validator: EnvVarValidator<T>,
	defaultValue?: T,
): T | EnvVarError => {
	const value = process.env[varName];

	if (value === undefined) {
		if (defaultValue !== undefined) {
			return defaultValue;
		}
		return createMissingEnvVarError(varName);
	}

	try {
		return validator(value);
	} catch (error) {
		return {
			type: "ENV_VAR_ERROR",
			message: `Invalid environment variable ${varName}: ${(error as Error).message}`,
			varName,
		};
	}
};

/**
 * Checks if a result is an EnvVarError
 */
export const isEnvVarError = (result: unknown): result is EnvVarError =>
	typeof result === "object" &&
	result !== null &&
	"type" in result &&
	result.type === "ENV_VAR_ERROR";

/**
 * Gets a required environment variable as string
 */
export const getRequiredEnvVar = (varName: string): string | EnvVarError =>
	getEnvVarWithValidator(varName, (value) => value);

/**
 * Gets an optional environment variable as string with a default value
 */
export const getOptionalEnvVar = (
	varName: string,
	defaultValue: string,
): string => {
	const result = getEnvVarWithValidator(
		varName,
		(value) => value,
		defaultValue,
	);
	return isEnvVarError(result) ? defaultValue : result;
};

/**
 * Gets a required environment variable as number
 */
export const getRequiredNumberEnvVar = (
	varName: string,
): number | EnvVarError =>
	getEnvVarWithValidator(varName, (value) => {
		const num = Number(value);
		if (Number.isNaN(num)) {
			throw new Error("Not a valid number");
		}
		return num;
	});

/**
 * Gets an optional environment variable as number with a default value
 */
export const getOptionalNumberEnvVar = (
	varName: string,
	defaultValue: number,
): number => {
	const result = getEnvVarWithValidator(
		varName,
		(value) => {
			const num = Number(value);
			if (Number.isNaN(num)) {
				throw new Error("Not a valid number");
			}
			return num;
		},
		defaultValue,
	);
	return isEnvVarError(result) ? defaultValue : result;
};

/**
 * Gets a required environment variable as boolean
 */
export const getRequiredBooleanEnvVar = (
	varName: string,
): boolean | EnvVarError =>
	getEnvVarWithValidator(varName, (value) => {
		const lowered = value.toLowerCase();
		if (lowered === "true" || lowered === "1" || lowered === "yes") return true;
		if (lowered === "false" || lowered === "0" || lowered === "no")
			return false;
		throw new Error("Not a valid boolean value");
	});

/**
 * Gets an optional environment variable as boolean with a default value
 */
export const getOptionalBooleanEnvVar = (
	varName: string,
	defaultValue: boolean,
): boolean => {
	const result = getEnvVarWithValidator(
		varName,
		(value) => {
			const lowered = value.toLowerCase();
			if (lowered === "true" || lowered === "1" || lowered === "yes")
				return true;
			if (lowered === "false" || lowered === "0" || lowered === "no")
				return false;
			throw new Error("Not a valid boolean value");
		},
		defaultValue,
	);
	return isEnvVarError(result) ? defaultValue : result;
};
