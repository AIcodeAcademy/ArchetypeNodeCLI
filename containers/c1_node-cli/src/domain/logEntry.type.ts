/**
 * @module logEntry.type
 * @description Defines the structure for log entries.
 */

/**
 * Represents the severity level of a log entry.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Represents a structured log entry.
 */
export type LogEntry = {
	readonly timestamp: Date;
	readonly level: LogLevel;
	readonly message: string;
	readonly context?: Record<string, unknown>; // Optional structured context
	readonly source?: string; // Optional source module/function
	readonly correlationId?: string; // Optional ID for tracing requests
};
