/**
 * @module logger.adapter
 * @description Adapter for console logging with colors using chalk.
 */
import chalk from "chalk";
import { LogEntry, LogLevel } from "../domain/logEntry.type.ts";

// Map LogLevel to chalk color functions
const levelColorMap: Record<LogLevel, chalk.Chalk> = {
	debug: chalk.gray,
	info: chalk.blue,
	warn: chalk.yellow,
	error: chalk.red,
};

/**
 * Formats a LogEntry for console output.
 *
 * @param entry The LogEntry to format.
 * @param useColors Whether to use colors in the output.
 * @param includeTimestamp Whether to include a timestamp.
 * @returns The formatted log string.
 */
const formatLogEntry = (
	entry: LogEntry,
	useColors: boolean,
	includeTimestamp: boolean,
): string => {
	const { timestamp, level, message, context, source } = entry;
	const color = levelColorMap[level] ?? chalk.white;
	const formattedTimestamp = includeTimestamp
		? `[${timestamp.toISOString()}] `
		: "";
	const formattedLevel = useColors
		? color(level.toUpperCase())
		: level.toUpperCase();
	const formattedSource = source ? ` (${source})` : "";
	const formattedContext = context ? ` ${JSON.stringify(context)}` : "";

	return `${formattedTimestamp}${formattedLevel}${formattedSource}: ${message}${formattedContext}`;
};

/**
 * Logs a structured LogEntry to the console.
 *
 * @param entry The LogEntry object to log.
 * @param useColors Enables/disables colored output (default: true).
 * @param includeTimestamp Includes/excludes timestamp (default: true).
 */
export const logToConsole = (
	entry: LogEntry,
	useColors = true,
	includeTimestamp = true,
): void => {
	const formattedMessage = formatLogEntry(entry, useColors, includeTimestamp);

	if (entry.level === "error") {
		console.error(formattedMessage);
	} else if (entry.level === "warn") {
		console.warn(formattedMessage);
	} else {
		console.log(formattedMessage);
	}
};
