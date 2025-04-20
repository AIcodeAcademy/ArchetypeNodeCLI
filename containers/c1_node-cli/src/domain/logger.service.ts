/**
 * @module logger.service
 * @description Service for handling application logging based on configuration.
 */
import { logToConsole } from "../system/logger.adapter.ts";
import { LoggingConfiguration } from "./configuration.type.ts";
import { LogEntry, LogLevel } from "./logEntry.type.ts";

// Define the order of log levels for comparison
const LOG_LEVEL_ORDER: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

/**
 * Creates a logger instance based on the provided logging configuration.
 *
 * @param {LoggingConfiguration} config - The logging configuration.
 * @returns {LoggerService} An instance of the LoggerService.
 */
export const createLoggerService = (config: LoggingConfiguration) => {
	const configuredLevel = LOG_LEVEL_ORDER[config.level];

	const shouldLog = (level: LogLevel): boolean => {
		return LOG_LEVEL_ORDER[level] >= configuredLevel;
	};

	// Centralized log function using the adapter
	const log = (
		level: LogLevel,
		message: string,
		context?: Record<string, unknown>,
		source?: string,
	) => {
		if (!shouldLog(level)) return;

		const entry: LogEntry = {
			timestamp: new Date(),
			level,
			message,
			context,
			source,
		};

		// TODO: Handle file destination based on config.destinations
		if (config.destinations.includes("console")) {
			logToConsole(entry, config.colors, config.timestamp);
		}
	};

	return {
		debug: (message: string, context?: Record<string, unknown>) => {
			log("debug", message, context, "LoggerService");
		},
		info: (message: string, context?: Record<string, unknown>) => {
			log("info", message, context, "LoggerService");
		},
		warn: (message: string, context?: Record<string, unknown>) => {
			log("warn", message, context, "LoggerService");
		},
		error: (message: string, context?: Record<string, unknown>) => {
			log("error", message, context, "LoggerService");
		},
		// Keep success for semantic clarity, maps to info level for filtering
		success: (message: string, context?: Record<string, unknown>) => {
			// Logged with info level severity but potentially different presentation if adapter handles it
			log("info", message, context, "LoggerService");
		},
	};
};

/**
 * Type definition for the LoggerService instance.
 */
export type LoggerService = ReturnType<typeof createLoggerService>;
