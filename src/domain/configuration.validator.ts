/**
 * @module configuration.validator
 * @description Provides validation functions for the Configuration type.
 */
import {
	CommandConfiguration,
	Configuration,
	FeatureConfiguration,
	LoggingConfiguration,
	PathConfiguration,
} from "./configuration.type.ts";
import { isEnvironment } from "./environment.validator.ts";

// Basic validation example. Enhance as needed (e.g., using Zod).

const isObject = (data: unknown): data is Record<string, unknown> => {
	return typeof data === "object" && data !== null && !Array.isArray(data);
};

const isLoggingConfiguration = (
	data: unknown,
): data is LoggingConfiguration => {
	if (!isObject(data)) return false;
	const config = data as LoggingConfiguration;
	return (
		(config.level === "debug" ||
			config.level === "info" ||
			config.level === "warn" ||
			config.level === "error") &&
		Array.isArray(config.destinations) &&
		config.destinations.every((d) => d === "console" || d === "file") &&
		(config.filePath === undefined || typeof config.filePath === "string") &&
		typeof config.colors === "boolean" &&
		typeof config.timestamp === "boolean"
	);
};

const isCommandConfiguration = (
	data: unknown,
): data is CommandConfiguration => {
	if (!isObject(data)) return false;
	const config = data as CommandConfiguration;
	return (
		typeof config.defaultCommand === "string" &&
		typeof config.allowUnknownOptions === "boolean"
	);
};

const isPathConfiguration = (data: unknown): data is PathConfiguration => {
	if (!isObject(data)) return false;
	const config = data as PathConfiguration;
	// Basic check for string paths, branded types are not checked at runtime here
	return (
		typeof config.data === "string" &&
		typeof config.temp === "string" &&
		typeof config.logs === "string"
	);
};

const isFeatureConfiguration = (
	data: unknown,
): data is FeatureConfiguration => {
	if (!isObject(data)) return false;
	const config = data as FeatureConfiguration;
	return (
		typeof config.autoUpdateCheck === "boolean" &&
		typeof config.telemetry === "boolean"
	);
};

/**
 * Validates the structure and values of a Configuration object.
 *
 * @param {unknown} data - The data to validate.
 * @returns {boolean} True if the data is a valid Configuration object, false otherwise.
 */
export const isConfiguration = (data: unknown): data is Configuration => {
	if (!isObject(data)) return false;

	const config = data as Configuration;

	return (
		isObject(config.app) &&
		typeof config.app.name === "string" &&
		typeof config.app.version === "string" &&
		typeof config.app.description === "string" &&
		isLoggingConfiguration(config.logging) &&
		isCommandConfiguration(config.commands) &&
		isPathConfiguration(config.paths) &&
		isFeatureConfiguration(config.features) &&
		(config.environment === undefined || isEnvironment(config.environment)) &&
		(config.filePath === undefined || typeof config.filePath === "string")
	);
};

/**
 * Asserts that the provided data is a valid Configuration object.
 *
 * @param {unknown} data - The data to validate.
 * @throws {Error} If the data is not a valid Configuration object.
 */
export const assertIsConfiguration = (
	data: unknown,
): asserts data is Configuration => {
	if (!isConfiguration(data)) {
		// TODO: Provide more specific error messages based on validation failures
		throw new Error("Invalid Configuration data");
	}
};
