import {
	styleDebug,
	styleError,
	styleInfo,
	styleWarning,
} from "../style-text.adapter.ts";
import type { LogEntry, LogTransportConfig } from "./log.type.ts";

const formatterMap: Record<
	LogTransportConfig["formatter"],
	(logEntry: LogEntry, logTransportConfig: LogTransportConfig) => string
> = {
	json: (logEntry) => jsonFormatter(logEntry),
	pretty: (logEntry, logTransportConfig) =>
		prettyFormatter(logEntry, logTransportConfig.timestamp),
	csv: (logEntry, logTransportConfig) =>
		csvFormatter(logEntry, logTransportConfig.timestamp),
};

export function formatLogEntry(
	logEntry: LogEntry,
	logTransportConfig: LogTransportConfig,
) {
	const formatter = formatterMap[logTransportConfig.formatter];
	if (!formatter)
		throw new Error(`Unknown formatter: ${logTransportConfig.formatter}`);
	return formatter(logEntry, logTransportConfig);
}

function jsonFormatter(logEntry: LogEntry) {
	const message = JSON.stringify(logEntry);
	return `${message}`;
}

const levelStyleMap: Record<string, (msg: string) => string> = {
	error: styleError,
	warn: styleWarning,
	info: styleInfo,
	debug: styleDebug,
};

// ToDo: clean the boolean flag
//https://www.perplexity.ai/search/best-practices-for-clean-code-uADj2mohQVCQCv5WwQHtpA

function prettyFormatter(logEntry: LogEntry, addTimestamp: boolean) {
	let timestamp = "";
	if (addTimestamp) {
		timestamp = `[${formatTimestamp(logEntry.timestamp)}] `;
	}
	const level5 = logEntry.level.padEnd(5);
	const message = `${timestamp}${level5} ${logEntry.message}`;
	const styleFn = levelStyleMap[logEntry.level];
	return styleFn ? styleFn(message) : message;
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
