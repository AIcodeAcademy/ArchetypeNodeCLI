import { styleText } from "node:util";
import { type LogEntry, logLevels } from "./log.type.ts";

export function jsonFormatter(logEntry: LogEntry) {
	return JSON.stringify(logEntry);
}

export function prettyFormatter(logEntry: LogEntry) {
	const timestamp = logEntry.timestamp ? `${logEntry.timestamp} ` : "";
	const message = `${timestamp}: ${logEntry.level} ${logEntry.message}`;
	const level =
		logLevels.find((level) => level.level === logEntry.level) || logLevels[0];
	const color =
		level.id > 2
			? "red"
			: level.id > 1
				? "yellow"
				: level.id > 0
					? "green"
					: "blue";
	const bold = level.id > 2 ? "bold" : level.id > 1 ? "italic" : "dim";
	return styleText([color, bold], message);
}

export function csvFormatter(logEntry: LogEntry) {
	const message = [logEntry.level, logEntry.message].join(",");
	if (logEntry.timestamp) {
		return [logEntry.timestamp, message].join(",");
	}
	return message;
}
