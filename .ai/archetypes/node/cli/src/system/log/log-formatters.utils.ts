import {
	styleDebug,
	styleError,
	styleInfo,
	styleWarning,
} from "../style-text.adapter.ts";
import { type LogEntry, type LogTransportConfig } from "./log.type.ts";

export function formatLogEntry(
	logEntry: LogEntry,
	logTransportConfig: LogTransportConfig,
) {
	switch (logTransportConfig.formatter) {
		case "json":
			return jsonFormatter(logEntry);
		case "pretty":
			return prettyFormatter(logEntry, logTransportConfig.timestamp);
		case "csv":
			return csvFormatter(logEntry, logTransportConfig.timestamp);
	}
}

function jsonFormatter(logEntry: LogEntry) {
	const message = JSON.stringify(logEntry);
	return `${message}`;
}

function prettyFormatter(logEntry: LogEntry, addTimestamp: boolean) {
	let timestamp = "";
	if (addTimestamp) {
		timestamp = `[${formatTimestamp(logEntry.timestamp)}] `;
	}
	const level5 = logEntry.level.padEnd(5);
	const message = `${timestamp}${level5} ${logEntry.message}`;
	switch (logEntry.level) {
		case "error":
			return styleError(message);
		case "warn":
			return styleWarning(message);
		case "info":
			return styleInfo(message);
		case "debug":
			return styleDebug(message);
		default:
			return message;
	}
}

function csvFormatter(logEntry: LogEntry, addTimestamp: boolean) {
	let message = [logEntry.level, logEntry.message].join(",");
	if (addTimestamp) {
		message = [formatTimestamp(logEntry.timestamp), message].join(",");
	}
	return `${message}`;
}

function formatTimestamp(timestamp: string) {
	const hhmmss = timestamp.split("T")[1].split(".")[0];
	return `${hhmmss}`;
}
