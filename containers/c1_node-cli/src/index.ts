/**
 * ArchetypeNodeCLI main entry point
 */
import { loadConfiguration } from "./domain/configuration.service.ts";
import { Configuration } from "./domain/configuration.type.ts";
import { createLoggerService, LoggerService } from "./domain/logger.service.ts";

/**
 * Initializes services and starts the application.
 */
const main = async (): Promise<void> => {
	let config: Configuration | undefined;
	let logger: LoggerService | undefined;

	try {
		// 1. Load Configuration
		// Environment variables (like CONFIG_FILE_PATH, LOG_LEVEL) can influence this.
		config = await loadConfiguration();

		// 2. Initialize Logger
		logger = createLoggerService(config.logging);

		logger.info(`Initializing ${config.app.name} v${config.app.version}...`, {
			configPath: config.filePath,
			environment: config.environment,
		});

		// 3. TODO: Initialize Command Service (Feature F2)

		// 4. TODO: Execute Command based on args (Feature F2)

		logger.success("Application initialized successfully.");
	} catch (error) {
		// Fallback basic logging if logger failed to initialize
		const errorLogger = logger ?? console;
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		errorLogger.error("Application failed to initialize:", {
			error: errorMessage,
			stack: error instanceof Error ? error.stack : undefined,
		});
		// Ensure the process exits with an error code
		process.exit(1);
	}
};

// Start the application
main();
