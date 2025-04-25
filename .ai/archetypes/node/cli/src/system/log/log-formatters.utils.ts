import { styleText } from "node:util";
import {
	LOG_LEVELS,
	type LogEntry,
	type LogTransportConfig,
} from "./log.type.ts";

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
	const foundLevel = LOG_LEVELS.find((ll) => ll.level === logEntry.level);
	const level = foundLevel || LOG_LEVELS[0];
	const color = level.color;
	const style = level.style;
	return styleText([color, style], message);
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
