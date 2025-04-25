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
	return `${message},\n`;
}

function prettyFormatter(logEntry: LogEntry, timestamp: boolean) {
	const timestampString = timestamp ? `${logEntry.timestamp}:` : "";
	const level5 = logEntry.level.padEnd(5);
	const message = `${timestampString}${level5} ${logEntry.message}`;
	const level =
		LOG_LEVELS.find((ll) => ll.level === logEntry.level) || LOG_LEVELS[0];
	const color = level.color;
	const style = level.style;
	return styleText([color, style], message);
}

function csvFormatter(logEntry: LogEntry, timestamp: boolean) {
	let message = [logEntry.level, logEntry.message].join(",");
	if (timestamp) {
		message = [logEntry.timestamp, message].join(",");
	}
	return `${message}\n`;
}
