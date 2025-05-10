import type { LogEntry } from "./log-entry.type.ts";
import { LOG_LEVELS, type LogLevelName } from "./log-level.type.ts";
import { logRepositoryFactory } from "./log-repository.factory.ts";
import type { LogRepositoryWriteEntry } from "./log-repository.type.ts";

/**
 * Logging service for the application.
 * Provides methods for logging messages at different severity levels.
 */
export const log = {
	/**
	 * Logs a debug message.
	 * @param {string} message - Message to log
	 * @param {Record<string, unknown>} [context] - Optional context data
	 */
	debug(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("debug", message, context);
		write(entry);
	},

	/**
	 * Logs an info message.
	 * @param {string} message - Message to log
	 * @param {Record<string, unknown>} [context] - Optional context data
	 */
	info(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("info", message, context);
		write(entry);
	},

	/**
	 * Logs a warning message.
	 * @param {string} message - Message to log
	 * @param {Record<string, unknown>} [context] - Optional context data
	 */
	warn(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("warn", message, context);
		write(entry);
	},

	/**
	 * Logs an error message.
	 * @param {Error} error - Error to log
	 * @param {Record<string, unknown>} [context] - Optional context data
	 */
	error(error: Error, context?: Record<string, unknown>) {
		const message = error.message;
		const errorContext = {
			stack: error.stack,
			cause: error.cause,
		};
		context && Object.assign(errorContext, context);
		const entry = buildLogEntry("error", message, errorContext);
		write(entry);
	},
};

function buildLogEntry(
	levelName: LogLevelName,
	message: string,
	context?: Record<string, unknown>,
): LogEntry {
	const level = LOG_LEVELS[levelName];
	const source = getSource(levelName);
	const timestamp = Date.now();
	return {
		level,
		message,
		source,
		context,
		timestamp,
	};
}

function getSource(levelName: LogLevelName): string | undefined {
	if (["debug", "error"].includes(levelName)) {
		const source = new Error().stack?.split("\n")[4].trim();
		return source ?? "log";
	}
	return undefined;
}

function write(entry: LogEntry) {
	// biome-ignore lint/complexity/noForEach: pipeline
	logRepositoryFactory
		.createForLevel(entry.level)
		.forEach((repositoryWriter: LogRepositoryWriteEntry) =>
			repositoryWriter.write(entry),
		);
}
