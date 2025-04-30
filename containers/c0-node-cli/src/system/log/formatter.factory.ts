import { styleTextFactory } from "./formatter-style.factory.ts";
import type {
	LogFormatterType,
	LogTransportConfig,
} from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";

export type FormatterFn = (
	logEntry: LogEntry,
	options: FormatterOptions,
) => string;

export type FormatterOptions = {
	addTimestamp?: boolean;
};

export function formatterFactory(logTransportConfig: LogTransportConfig) {
	const formatter = formattersMap[logTransportConfig.formatter];
	if (!formatter)
		return (logEntry: LogEntry, options: FormatterOptions) => logEntry.message;

	return formatter;
}

const formattersMap: Record<LogFormatterType, FormatterFn> = {
	json: jsonFormatter,
	pretty: prettyFormatter,
	csv: csvFormatter,
};

function jsonFormatter(logEntry: LogEntry, options: FormatterOptions) {
	const message = JSON.stringify(logEntry);
	return `${message}`;
}

function prettyFormatter(logEntry: LogEntry, options: FormatterOptions) {
	let timestamp = "";
	if (options.addTimestamp) {
		timestamp = `[${formatTimestamp(logEntry.timestamp)}] `;
	}
	const level5 = logEntry.level.padEnd(5);
	const message = `${timestamp}${level5} ${logEntry.message}`;
	const styleFn = styleTextFactory(logEntry.level);
	return styleFn ? styleFn(message) : message;
}

function csvFormatter(logEntry: LogEntry, options: FormatterOptions) {
	const parts = [logEntry.level, logEntry.message];
	if (logEntry.context) {
		const contextParts = Object.entries(logEntry.context)
			.filter(
				([key, value]) => value !== undefined && typeof value !== "object",
			)
			.map(([key, value]) => `${key}:${value}`)
			.join(",");
		parts.push(contextParts);
	}
	let message = parts.join(",");
	if (options.addTimestamp) {
		message = [formatTimestamp(logEntry.timestamp), message].join(",");
	}
	return message;
}

function formatTimestamp(timestamp: string) {
	const hhmmss = timestamp.split("T")[1].split(".")[0];
	return `${hhmmss}`;
}
