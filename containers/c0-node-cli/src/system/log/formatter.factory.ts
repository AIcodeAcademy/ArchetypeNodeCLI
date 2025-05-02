import { formatterStyleFactory } from "./formatter-style.factory.ts";
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

export const formatterFactory = {
	create(logTransportConfig: LogTransportConfig) {
		const formatter = formattersMap[logTransportConfig.formatter];
		if (!formatter) return defaultFormatter;
		return formatter;
	},
};

const formattersMap: Record<LogFormatterType, FormatterFn> = {
	json: (logEntry: LogEntry, options: FormatterOptions) => {
		const message = JSON.stringify(logEntry);
		return `${message}`;
	},

	pretty: (logEntry: LogEntry, options: FormatterOptions) => {
		let timestamp = "";
		if (options.addTimestamp) {
			timestamp = `[${formatTimestamp(logEntry.timestamp)}] `;
		}
		const level5 = logEntry.level.padEnd(5);
		const message = `${timestamp}${level5} ${logEntry.message}`;
		const styleFn = formatterStyleFactory.create(logEntry.level);
		return styleFn ? styleFn(message) : message;
	},

	csv: (logEntry: LogEntry, options: FormatterOptions) => {
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
	},
} as Record<LogFormatterType, FormatterFn>;

const defaultFormatter: FormatterFn = (
	logEntry: LogEntry,
	options: FormatterOptions,
) => {
	return logEntry.message;
};

function formatTimestamp(timestamp: string) {
	const hhmmss = timestamp.split("T")[1].split(".")[0];
	return `${hhmmss}`;
}
