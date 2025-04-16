/**
 * Configuration loading and access utility with type safety and validation
 */
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Error thrown when there is an issue with configuration
 */
export type ConfigError = {
	type: "CONFIG_ERROR";
	message: string;
	cause?: unknown;
};

/**
 * Creates a configuration error
 */
export const createConfigError = (
	message: string,
	cause?: unknown,
): ConfigError => ({
	type: "CONFIG_ERROR",
	message,
	cause,
});

/**
 * Checks if a result is a ConfigError
 */
export const isConfigError = (result: unknown): result is ConfigError =>
	typeof result === "object" &&
	result !== null &&
	"type" in result &&
	result.type === "CONFIG_ERROR";

/**
 * Type definition for configuration schema validation function
 */
export type ConfigValidator<T> = (data: unknown) => T;

/**
 * Loads configuration from a JSON file with schema validation
 */
export const loadConfigFromFile = async <T>(
	filePath: string,
	validator: ConfigValidator<T>,
): Promise<T | ConfigError> => {
	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		const parsedConfig = JSON.parse(fileContent) as unknown;

		try {
			return validator(parsedConfig);
		} catch (validationError) {
			return createConfigError(
				`Configuration validation failed: ${(validationError as Error).message}`,
				validationError,
			);
		}
	} catch (fileError) {
		return createConfigError(
			`Failed to load configuration from ${filePath}: ${(fileError as Error).message}`,
			fileError,
		);
	}
};

/**
 * Loads configuration from a JSON file with default values if file is not found
 */
export const loadConfigWithDefaults = async <T>(
	filePath: string,
	validator: ConfigValidator<T>,
	defaultConfig: T,
): Promise<T> => {
	const result = await loadConfigFromFile(filePath, validator);
	return isConfigError(result) ? defaultConfig : result;
};

/**
 * Saves configuration to a JSON file
 */
export const saveConfigToFile = async <T>(
	filePath: string,
	config: T,
): Promise<undefined | ConfigError> => {
	try {
		const dirPath = path.dirname(filePath);

		try {
			await fs.mkdir(dirPath, { recursive: true });
		} catch (mkdirError) {
			return createConfigError(
				`Failed to create directory for config file: ${(mkdirError as Error).message}`,
				mkdirError,
			);
		}

		const configJson = JSON.stringify(config, null, 2);
		await fs.writeFile(filePath, configJson, "utf-8");
		return undefined;
	} catch (writeError) {
		return createConfigError(
			`Failed to save configuration to ${filePath}: ${(writeError as Error).message}`,
			writeError,
		);
	}
};

/**
 * Type-safe accessor for config values with path support
 * Example: getConfigValue(config, 'server.port', 3000)
 */
export const getConfigValue = <T, D = T>(
	config: Record<string, unknown>,
	path: string,
	defaultValue?: D,
): T | D | undefined => {
	const parts = path.split(".");
	let current: unknown = config;

	for (const part of parts) {
		if (current === null || typeof current !== "object") {
			return defaultValue;
		}

		current = (current as Record<string, unknown>)[part];

		if (current === undefined) {
			return defaultValue;
		}
	}

	return current as T;
};

/**
 * Creates a simple schema validator for configuration objects
 */
export const createConfigValidator = <T>(
	schema: Record<string, (value: unknown) => boolean>,
	errorMessages: Record<string, string> = {},
): ConfigValidator<T> => {
	return (data: unknown): T => {
		if (!data || typeof data !== "object") {
			throw new Error("Configuration must be an object");
		}

		for (const [key, validator] of Object.entries(schema)) {
			const value = (data as Record<string, unknown>)[key];

			if (!validator(value)) {
				throw new Error(
					errorMessages[key] ||
						`Invalid value for ${key}: ${JSON.stringify(value)}`,
				);
			}
		}

		return data as T;
	};
};
