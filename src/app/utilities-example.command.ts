/**
 * Example command that demonstrates the utilities ecosystem
 * Shows how to use environment, configuration, and logging utilities
 */

import { AppConfig } from "../system/config.type";
import {
	createConfig,
	getConfigFilePath,
	getConfigValue,
} from "../utils/config.utils.ts";
import {
	getBooleanEnv,
	getEnvVarsByPrefix,
	getNumberEnv,
	getStringEnv,
	hasEnvVar,
} from "../utils/env.utils.ts";
import {
	createLogger,
	logDebug,
	logError,
	logInfo,
	logWarn,
} from "../utils/log.utils.ts";

/**
 * Demonstrate the utilities ecosystem
 */
export function runUtilitiesDemo(): void {
	demonstrateEnvironmentUtils();
	demonstrateConfigUtils();
	demonstrateLogUtils();
}

/**
 * Demonstrate environment variable utilities
 */
function demonstrateEnvironmentUtils(): void {
	logInfo("--- Environment Utilities Demo ---");

	// Get environment variables with different types
	const nodeEnv = getStringEnv("NODE_ENV", { defaultValue: "development" });
	const port = getNumberEnv("PORT", { defaultValue: 3000 });
	const debugMode = getBooleanEnv("DEBUG", { defaultValue: false });

	logInfo(`Current environment: ${nodeEnv}`);
	logInfo(`Server port: ${port}`);
	logInfo(`Debug mode: ${debugMode}`);

	// Check if an environment variable exists
	const hasSecretKey = hasEnvVar("SECRET_KEY");
	logInfo(`Has SECRET_KEY: ${hasSecretKey}`);

	// Get all environment variables with a specific prefix
	const appVars = getEnvVarsByPrefix("APP_");
	logInfo("Application-specific environment variables:", appVars);
}

/**
 * Demonstrate configuration utilities
 */
function demonstrateConfigUtils(): void {
	logInfo("--- Configuration Utilities Demo ---");

	// Get configuration file path for current environment
	const configPath = getConfigFilePath({
		configDir: process.cwd(),
		configFileName: "app-config",
	});
	logInfo(`Config file path: ${configPath}`);

	// Create configuration with defaults and environment overrides
	const config: AppConfig = createConfig({
		configFilePath: configPath,
		defaultConfig: {
			name: "utilities-demo",
			version: "1.0.0",
			environment: "development",
			log: {
				level: "debug",
				useColors: true,
				includeTimestamp: true,
			},
		},
		envPrefix: "APP",
	});

	logInfo("Application configuration:", config);

	// Access nested configuration properties
	const logLevel = getConfigValue<string>(config, "log.level", "info");
	const appName = getConfigValue<string>(config, "name", "unknown");

	logInfo(`App name from config: ${appName}`);
	logInfo(`Log level from config: ${logLevel}`);
}

/**
 * Demonstrate logging utilities
 */
function demonstrateLogUtils(): void {
	logInfo("--- Logging Utilities Demo ---");

	// Use the default logger
	logDebug("This is a debug message");
	logInfo("This is an info message");
	logWarn("This is a warning message");
	logError("This is an error message");

	// Create a custom logger
	const customLogger = createLogger({
		minLevel: "warn",
		useColors: true,
		includeTimestamp: false,
	});

	logInfo("Messages from custom logger (only warnings and errors will show):");
	customLogger.debug("Custom logger: Debug message (won't show)");
	customLogger.info("Custom logger: Info message (won't show)");
	customLogger.warn("Custom logger: Warning message");
	customLogger.error("Custom logger: Error message");
}
