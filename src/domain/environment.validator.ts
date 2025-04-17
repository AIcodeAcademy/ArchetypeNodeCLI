/**
 * @module environment.validator
 * @description Provides validation functions for the Environment type.
 */
import { Environment } from "./environment.type.ts";

// Basic validation example. Enhance as needed (e.g., using Zod).

/**
 * Validates the structure and values of an Environment object.
 *
 * @param {unknown} data - The data to validate.
 * @returns {boolean} True if the data is a valid Environment object, false otherwise.
 */
export const isEnvironment = (data: unknown): data is Environment => {
	if (typeof data !== "object" || data === null) {
		return false;
	}

	const env = data as Environment;

	// Optional: Validate NODE_ENV
	if (
		env.NODE_ENV !== undefined &&
		!["development", "production", "test"].includes(env.NODE_ENV)
	) {
		return false;
	}

	// Optional: Validate LOG_LEVEL
	if (
		env.LOG_LEVEL !== undefined &&
		!["debug", "info", "warn", "error"].includes(env.LOG_LEVEL)
	) {
		return false;
	}

	// Optional: Validate CONFIG_FILE_PATH (basic check for string)
	if (
		env.CONFIG_FILE_PATH !== undefined &&
		typeof env.CONFIG_FILE_PATH !== "string"
	) {
		// More specific FilePath validation could be added here
		return false;
	}

	// Add validation for other properties as needed

	return true;
};

/**
 * Asserts that the provided data is a valid Environment object.
 *
 * @param {unknown} data - The data to validate.
 * @throws {Error} If the data is not a valid Environment object.
 */
export const assertIsEnvironment = (
	data: unknown,
): asserts data is Environment => {
	if (!isEnvironment(data)) {
		// TODO: Provide more specific error messages based on validation failures
		throw new Error("Invalid Environment data");
	}
};
