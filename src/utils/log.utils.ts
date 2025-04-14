/**
 * Logging utility functions
 * Provides structured logging with different severity levels and formatting options
 */

import chalk from "chalk";
import { LogLevel } from "../system/config.type";

/**
 * Log level severity order for filtering
 */
const LOG_LEVEL_SEVERITY: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

/**
 * Log level colors for console output
 */
const LOG_LEVEL_COLORS: Record<LogLevel, chalk.ChalkFunction> = {
	debug: chalk.cyan,
	info: chalk.blue,
	warn: chalk.yellow,
	error: chalk.red,
};

/**
 * Logger configuration
 */
export type LoggerConfig = {
	minLevel: LogLevel;
	useColors: boolean;
	includeTimestamp: boolean;
};

/**
 * Default logger configuration
 */
const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
	minLevel: "info",
	useColors: true,
	includeTimestamp: true,
};

/**
 * Create a new logger with the specified configuration
 */
export function createLogger(config: Partial<LoggerConfig> = {}): {
	debug: (message: string, ...args: unknown[]) => void;
	info: (message: string, ...args: unknown[]) => void;
	warn: (message: string, ...args: unknown[]) => void;
	error: (message: string, ...args: unknown[]) => void;
	log: (level: LogLevel, message: string, ...args: unknown[]) => void;
} {
	const loggerConfig: LoggerConfig = {
		...DEFAULT_LOGGER_CONFIG,
		...config,
	};

	const minSeverity = LOG_LEVEL_SEVERITY[loggerConfig.minLevel];

	/**
	 * Internal log function that handles formatting and output
	 */
	function log(level: LogLevel, message: string, ...args: unknown[]): void {
		if (LOG_LEVEL_SEVERITY[level] < minSeverity) {
			return;
		}

		let formattedMessage = message;
		const metadata: string[] = [];

		// Add timestamp if configured
		if (loggerConfig.includeTimestamp) {
			metadata.push(formatTimestamp(new Date()));
		}

		// Add log level
		const levelText = `[${level.toUpperCase()}]`;
		if (loggerConfig.useColors) {
			metadata.push(LOG_LEVEL_COLORS[level](levelText));
		} else {
			metadata.push(levelText);
		}

		// Format final message
		const prefix = metadata.join(" ");
		formattedMessage = `${prefix} ${message}`;

		// Output to console
		switch (level) {
			case "error":
				console.error(formattedMessage, ...args);
				break;
			case "warn":
				console.warn(formattedMessage, ...args);
				break;
			default:
				console.log(formattedMessage, ...args);
		}
	}

	return {
		debug: (message: string, ...args: unknown[]): void =>
			log("debug", message, ...args),
		info: (message: string, ...args: unknown[]): void =>
			log("info", message, ...args),
		warn: (message: string, ...args: unknown[]): void =>
			log("warn", message, ...args),
		error: (message: string, ...args: unknown[]): void =>
			log("error", message, ...args),
		log,
	};
}

/**
 * Format a timestamp for logging
 */
function formatTimestamp(date: Date): string {
	return date.toISOString();
}

/**
 * Create a default logger instance
 */
export const logger = createLogger();

/**
 * Log messages with debug level
 */
export function logDebug(message: string, ...args: unknown[]): void {
	logger.debug(message, ...args);
}

/**
 * Log messages with info level
 */
export function logInfo(message: string, ...args: unknown[]): void {
	logger.info(message, ...args);
}

/**
 * Log messages with warning level
 */
export function logWarn(message: string, ...args: unknown[]): void {
	logger.warn(message, ...args);
}

/**
 * Log messages with error level
 */
export function logError(message: string, ...args: unknown[]): void {
	logger.error(message, ...args);
}
