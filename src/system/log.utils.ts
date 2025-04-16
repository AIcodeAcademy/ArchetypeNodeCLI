/**
 * Logging utility with leveled logging, colored output and multiple destinations
 */

import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";
import { ensureDirectoryExists } from "./fs.utils.ts";

/**
 * Available log levels
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Log destination types
 */
export type LogDestination = "console" | "file" | "none";

/**
 * Configuration for the logger
 */
export type LogConfig = {
	level: LogLevel;
	destinations: LogDestination[];
	filePath?: string;
	timestamp: boolean;
	colors: boolean;
};

/**
 * Default configuration for the logger
 */
export const DEFAULT_LOG_CONFIG: LogConfig = {
	level: "info",
	destinations: ["console"],
	timestamp: true,
	colors: true,
};

/**
 * Current logger configuration
 */
let logConfig: LogConfig = { ...DEFAULT_LOG_CONFIG };

/**
 * Gets the current logger configuration
 */
export const getLogConfig = (): LogConfig => ({ ...logConfig });

/**
 * Configures the logger
 */
export const configureLogger = (config: Partial<LogConfig>): void => {
	logConfig = {
		...logConfig,
		...config,
	};
};

/**
 * Log level numeric values for comparison
 */
const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

/**
 * Checks if the given log level is enabled
 */
export const isLogLevelEnabled = (level: LogLevel): boolean =>
	LOG_LEVEL_VALUES[level] >= LOG_LEVEL_VALUES[logConfig.level];

/**
 * Format a log message with timestamp and level
 */
export const formatLogMessage = (
	level: LogLevel,
	message: string,
	data?: unknown,
): string => {
	const parts: string[] = [];

	if (logConfig.timestamp) {
		const timestamp = new Date().toISOString();
		parts.push(`[${timestamp}]`);
	}

	parts.push(`[${level.toUpperCase()}]`);
	parts.push(message);

	if (data !== undefined) {
		if (typeof data === "object" && data !== null) {
			try {
				parts.push(JSON.stringify(data));
			} catch {
				parts.push(String(data));
			}
		} else {
			parts.push(String(data));
		}
	}

	return parts.join(" ");
};

/**
 * Apply colors to a log message based on level
 */
export const colorizeLogMessage = (
	level: LogLevel,
	message: string,
): string => {
	if (!logConfig.colors) {
		return message;
	}

	switch (level) {
		case "debug":
			return chalk.gray(message);
		case "info":
			return chalk.blue(message);
		case "warn":
			return chalk.yellow(message);
		case "error":
			return chalk.red(message);
		default:
			return message;
	}
};

/**
 * Writes a log message to the console
 */
export const logToConsole = (level: LogLevel, message: string): void => {
	const colorizedMessage = colorizeLogMessage(level, message);

	switch (level) {
		case "error":
			console.error(colorizedMessage);
			break;
		case "warn":
			console.warn(colorizedMessage);
			break;
		default:
			console.log(colorizedMessage);
			break;
	}
};

/**
 * Writes a log message to a file
 */
export const logToFile = async (message: string): Promise<void> => {
	if (!logConfig.filePath) {
		return;
	}

	try {
		const dirPath = path.dirname(logConfig.filePath);
		await ensureDirectoryExists(dirPath);
		await fs.appendFile(logConfig.filePath, message + "\n", "utf-8");
	} catch (error) {
		console.error(`Failed to write to log file: ${(error as Error).message}`);
	}
};

/**
 * Core logging function
 */
export const log = async (
	level: LogLevel,
	message: string,
	data?: unknown,
): Promise<void> => {
	if (!isLogLevelEnabled(level)) {
		return;
	}

	const formattedMessage = formatLogMessage(level, message, data);

	for (const destination of logConfig.destinations) {
		if (destination === "console") {
			logToConsole(level, formattedMessage);
		} else if (destination === "file") {
			await logToFile(formattedMessage);
		}
	}
};

/**
 * Logs a debug message
 */
export const logDebug = (message: string, data?: unknown): Promise<void> =>
	log("debug", message, data);

/**
 * Logs an info message
 */
export const logInfo = (message: string, data?: unknown): Promise<void> =>
	log("info", message, data);

/**
 * Logs a warning message
 */
export const logWarn = (message: string, data?: unknown): Promise<void> =>
	log("warn", message, data);

/**
 * Logs an error message
 */
export const logError = (message: string, data?: unknown): Promise<void> =>
	log("error", message, data);
