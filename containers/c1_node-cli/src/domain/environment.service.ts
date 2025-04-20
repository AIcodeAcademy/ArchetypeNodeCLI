/**
 * @module environment.service
 * @description Service for accessing and validating environment variables.
 */
import { getEnvironmentVariable } from "../system/environment.adapter.ts";
import { FilePath } from "../system/system.type.ts";
import { Environment } from "./environment.type.ts";
import { assertIsEnvironment } from "./environment.validator.ts";

/**
 * Retrieves and validates environment variables relevant to the application.
 *
 * @returns {Environment} The validated environment variables.
 * @throws {Error} If validation fails.
 */
export const getEnvironment = (): Environment => {
	const environmentData: Record<string, unknown> = {
		NODE_ENV: getEnvironmentVariable("NODE_ENV"),
		LOG_LEVEL: getEnvironmentVariable("LOG_LEVEL"),
		CONFIG_FILE_PATH: getEnvironmentVariable("CONFIG_FILE_PATH") as
			| FilePath
			| undefined,
		// Retrieve other variables as needed
	};

	// Filter out undefined values before validation
	const definedEnvironmentData = Object.entries(environmentData)
		.filter(([, value]) => value !== undefined)
		.reduce(
			(obj, [key, value]) => {
				obj[key] = value;
				return obj;
			},
			{} as Record<string, unknown>,
		);

	assertIsEnvironment(definedEnvironmentData); // Validate the structure

	return definedEnvironmentData;
};
