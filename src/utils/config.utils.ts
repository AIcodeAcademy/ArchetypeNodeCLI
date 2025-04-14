/**
 * Configuration utility functions
 * Provides functionality for loading and accessing application configuration
 */

import fs from "fs";
import path from "path";
import { AppConfig, LogConfig, LogLevel } from "../system/config.type";
import { getBooleanEnv, getStringEnv } from "./env.utils";

/**
 * Default log configuration
 */
const DEFAULT_LOG_CONFIG: LogConfig = {
	level: "info",
	useColors: true,
	includeTimestamp: true,
};

/**
 * Default application configuration
 */
const DEFAULT_APP_CONFIG: AppConfig = {
	name: "archetype-node-cli",
	version: "1.0.0",
	environment: "development",
	log: DEFAULT_LOG_CONFIG,
};

/**
 * Load configuration from a JSON file
 */
export function loadConfigFromFile(filePath: string): Record<string, unknown> {
	try {
		if (!fs.existsSync(filePath)) {
			return {};
		}

		const fileContent = fs.readFileSync(filePath, "utf8");
		return JSON.parse(fileContent);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Failed to load configuration from ${filePath}: ${error.message}`,
			);
		}
		throw error;
	}
}

/**
 * Merge configurations with priority: defaults < file < environment variables
 */
export function createConfig(
	options: {
		configFilePath?: string;
		defaultConfig?: Partial<AppConfig>;
		envPrefix?: string;
	} = {},
): AppConfig {
	const { configFilePath, defaultConfig = {}, envPrefix = "" } = options;

	// Start with default configuration
	const config: AppConfig = {
		...DEFAULT_APP_CONFIG,
		...defaultConfig,
	};

	// Override with file configuration if provided
	if (configFilePath) {
		try {
			const fileConfig = loadConfigFromFile(configFilePath);
			mergeConfigs(config, fileConfig);
		} catch (error) {
			// File errors are non-fatal, just log and continue
			console.warn(
				`Warning: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	// Override with environment variables
	applyEnvironmentOverrides(config, envPrefix);

	return config;
}

/**
 * Merge source configuration into target configuration
 */
function mergeConfigs(
	target: Record<string, any>,
	source: Record<string, unknown>,
): void {
	Object.entries(source).forEach(([key, value]) => {
		if (
			typeof value === "object" &&
			value !== null &&
			!Array.isArray(value) &&
			typeof target[key] === "object" &&
			target[key] !== null
		) {
			// Recursively merge nested objects
			mergeConfigs(target[key], value as Record<string, unknown>);
		} else {
			// Direct assignment for primitive values
			target[key] = value;
		}
	});
}

/**
 * Apply environment variable overrides to configuration
 */
function applyEnvironmentOverrides(config: AppConfig, prefix: string): void {
	// Core application settings
	const envPrefix = prefix ? `${prefix}_` : "";

	config.environment = getStringEnv(`${envPrefix}NODE_ENV`, {
		defaultValue: config.environment,
	});

	config.name = getStringEnv(`${envPrefix}APP_NAME`, {
		defaultValue: config.name,
	});

	config.version = getStringEnv(`${envPrefix}APP_VERSION`, {
		defaultValue: config.version,
	});

	// Logging configuration
	const logLevelEnv = getStringEnv(`${envPrefix}LOG_LEVEL`, {
		defaultValue: config.log.level,
	});

	config.log.level = validateLogLevel(logLevelEnv);
	config.log.useColors = getBooleanEnv(`${envPrefix}USE_COLORS`, {
		defaultValue: config.log.useColors,
	});
}

/**
 * Validate that a string is a valid log level
 */
function validateLogLevel(level: string): LogLevel {
	const validLevels: LogLevel[] = ["debug", "info", "warn", "error"];
	const normalizedLevel = level.toLowerCase() as LogLevel;

	if (!validLevels.includes(normalizedLevel)) {
		console.warn(`Warning: Invalid log level "${level}", using "info" instead`);
		return "info";
	}

	return normalizedLevel;
}

/**
 * Get config file path based on environment
 */
export function getConfigFilePath(
	options: {
		configDir?: string;
		environment?: string;
		configFileName?: string;
	} = {},
): string {
	const {
		configDir = process.cwd(),
		environment = getStringEnv("NODE_ENV", { defaultValue: "development" }),
		configFileName = "config",
	} = options;

	return path.resolve(configDir, `${configFileName}.${environment}.json`);
}

/**
 * Access a nested configuration property using a dot-notation path
 */
export function getConfigValue<T>(
	config: Record<string, any>,
	path: string,
	defaultValue?: T,
): T | undefined {
	const keys = path.split(".");
	let result: any = config;

	for (const key of keys) {
		if (result === undefined || result === null || typeof result !== "object") {
			return defaultValue;
		}
		result = result[key];
	}

	return result === undefined ? defaultValue : result;
}
