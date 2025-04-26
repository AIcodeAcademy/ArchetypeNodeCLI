import {
	styleDebug,
	styleError,
	styleInfo,
	styleWarning,
} from "../style-text.adapter.ts";
import type { LogEntry, LogTransportConfig } from "./log.type.ts";

type FormatterFn = (logEntry: LogEntry, options: FormatterOptions) => string;
type FormatterOptions = {
	addTimestamp?: boolean;
};

const formatterMap: Record<LogTransportConfig["formatter"], FormatterFn> = {
	json: jsonFormatter,
	pretty: prettyFormatter,
	csv: csvFormatter,
};

export function formatLogEntry(
	logEntry: LogEntry,
	logTransportConfig: LogTransportConfig,
) {
	const formatter = formatterMap[logTransportConfig.formatter];
	if (!formatter) return logEntry.message;
	const options = {
		addTimestamp: logTransportConfig.timestamp,
	};
	return formatter(logEntry, options);
}

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
	const styleFn = levelStyleMap[logEntry.level];
	return styleFn ? styleFn(message) : message;
}

function csvFormatter(logEntry: LogEntry, options: FormatterOptions) {
	let message = [logEntry.level, logEntry.message].join(",");
	if (options.addTimestamp) {
		message = [formatTimestamp(logEntry.timestamp), message].join(",");
	}
	return `${message}`;
}

function formatTimestamp(timestamp: string) {
	const hhmmss = timestamp.split("T")[1].split(".")[0];
	return `${hhmmss}`;
}

const levelStyleMap: Record<string, (msg: string) => string> = {
	error: styleError,
	warn: styleWarning,
	info: styleInfo,
	debug: styleDebug,
};
