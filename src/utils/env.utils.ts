/**
 * Environment variable utility functions
 * Provides type-safe access to environment variables with validation
 */

import { EnvVarType, FormatFunction } from "../system/config.type";

/**
 * Standard formatters for common environment variable types
 */
const formatters = {
	string: (value: string): string => value,
	number: (value: string): number => {
		const num = Number(value);
		if (isNaN(num)) {
			throw new Error(`Value "${value}" cannot be converted to a number`);
		}
		return num;
	},
	boolean: (value: string): boolean => {
		const normalized = value.toLowerCase();
		if (["true", "1", "yes", "y"].includes(normalized)) return true;
		if (["false", "0", "no", "n"].includes(normalized)) return false;
		throw new Error(`Value "${value}" cannot be converted to a boolean`);
	},
};

/**
 * Get an environment variable with optional formatting and default value
 */
export function getEnvVar<T extends EnvVarType = string>(
	name: string,
	options: {
		format?: FormatFunction<T>;
		defaultValue?: T;
		required?: boolean;
	} = {},
): T {
	const {
		format = formatters.string as FormatFunction<T>,
		defaultValue,
		required = false,
	} = options;
	const value = process.env[name];

	if (value === undefined) {
		if (required && defaultValue === undefined) {
			throw new Error(`Required environment variable ${name} is missing`);
		}
		return defaultValue as T;
	}

	try {
		return format(value);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Error processing environment variable ${name}: ${error.message}`,
			);
		}
		throw error;
	}
}

/**
 * Get a string environment variable
 */
export function getStringEnv(
	name: string,
	options: { defaultValue?: string; required?: boolean } = {},
): string {
	return getEnvVar(name, { ...options, format: formatters.string });
}

/**
 * Get a number environment variable
 */
export function getNumberEnv(
	name: string,
	options: { defaultValue?: number; required?: boolean } = {},
): number {
	return getEnvVar(name, { ...options, format: formatters.number });
}

/**
 * Get a boolean environment variable
 */
export function getBooleanEnv(
	name: string,
	options: { defaultValue?: boolean; required?: boolean } = {},
): boolean {
	return getEnvVar(name, { ...options, format: formatters.boolean });
}

/**
 * Check if an environment variable exists
 */
export function hasEnvVar(name: string): boolean {
	return process.env[name] !== undefined;
}

/**
 * Get all environment variables that match a prefix
 */
export function getEnvVarsByPrefix(prefix: string): Record<string, string> {
	return Object.entries(process.env)
		.filter(([key]) => key.startsWith(prefix))
		.reduce(
			(acc, [key, value]) => {
				acc[key] = value ?? "";
				return acc;
			},
			{} as Record<string, string>,
		);
}
