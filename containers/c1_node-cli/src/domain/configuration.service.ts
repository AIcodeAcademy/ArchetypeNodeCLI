/**
 * @module configuration.service
 * @description Service for loading and validating application configuration.
 */
import { readConfigurationFile } from "../system/configuration.adapter.ts";
import { FilePath } from "../system/system.type.ts";
import { Configuration } from "./configuration.type.ts";
import { assertIsConfiguration } from "./configuration.validator.ts";
import { getEnvironment } from "./environment.service.ts";

const DEFAULT_CONFIG_PATH = "./config.json" as FilePath;

/**
 * Loads the application configuration from a file, validates it,
 * and merges it with environment context.
 *
 * @param {FilePath} [filePath] - Optional path to the configuration file.
 *                                If not provided, uses CONFIG_FILE_PATH env var or default.
 * @returns {Promise<Configuration>} A promise resolving to the validated configuration.
 * @throws {Error} If the configuration file cannot be read, parsed, or validated.
 */
export const loadConfiguration = async (
	filePath?: FilePath,
): Promise<Configuration> => {
	const environment = getEnvironment();
	const effectiveFilePath =
		filePath ?? environment.CONFIG_FILE_PATH ?? DEFAULT_CONFIG_PATH;

	console.log(`Loading configuration from: ${effectiveFilePath}`); // Temporary log

	try {
		const rawConfig = await readConfigurationFile(effectiveFilePath);
		assertIsConfiguration(rawConfig); // Validate the structure and types

		// Merge environment and file path into the configuration object
		const finalConfiguration: Configuration = {
			...rawConfig,
			environment: environment,
			filePath: effectiveFilePath,
		};

		return finalConfiguration;
	} catch (error) {
		console.error(`Failed to load configuration from "${effectiveFilePath}"`);
		// Re-throw the error for the application entry point to handle
		if (error instanceof Error) {
			throw new Error(`Configuration error: ${error.message}`);
		}
		throw new Error("Unknown configuration error");
	}
};
