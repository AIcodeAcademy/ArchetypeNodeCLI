/**
 * @module logger.service
 * @description Service for handling application logging based on configuration.
 */
import {
	logDebug,
	logError,
	logInfo,
	logSuccess,
	logWarn,
} from "../system/logger.adapter.ts";
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

	const formatMessage = (entry: Omit<LogEntry, "timestamp">): string => {
		let message = entry.message;
		if (config.timestamp) {
			message = `[${new Date().toISOString()}] ${message}`;
		}
		// TODO: Add context formatting if needed
		// TODO: Handle file destination
		return message;
	};

	return {
		debug: (message: string, context?: Record<string, unknown>) => {
			if (!shouldLog("debug")) return;
			const entry: Omit<LogEntry, "timestamp"> = {
				level: "debug",
				message,
				context,
			};
			logDebug(formatMessage(entry));
		},
		info: (message: string, context?: Record<string, unknown>) => {
			if (!shouldLog("info")) return;
			const entry: Omit<LogEntry, "timestamp"> = {
				level: "info",
				message,
				context,
			};
			logInfo(formatMessage(entry));
		},
		warn: (message: string, context?: Record<string, unknown>) => {
			if (!shouldLog("warn")) return;
			const entry: Omit<LogEntry, "timestamp"> = {
				level: "warn",
				message,
				context,
			};
			logWarn(formatMessage(entry));
		},
		error: (message: string, context?: Record<string, unknown>) => {
			if (!shouldLog("error")) return;
			const entry: Omit<LogEntry, "timestamp"> = {
				level: "error",
				message,
				context,
			};
			logError(formatMessage(entry));
		},
		success: (message: string, context?: Record<string, unknown>) => {
			// Success is often treated like info, but uses a different color
			if (!shouldLog("info")) return;
			const entry: Omit<LogEntry, "timestamp"> = {
				level: "info",
				message,
				context,
			}; // Logged as info level
			logSuccess(formatMessage(entry));
		},
	};
};

/**
 * Type definition for the LoggerService instance.
 */
export type LoggerService = ReturnType<typeof createLoggerService>;
