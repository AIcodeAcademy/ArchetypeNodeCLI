import { createConsoleTransport } from "./console-transporter.util.ts";
import { createFileTransport } from "./fs-transporter.util.ts";
import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import {
	LOG_LEVELS,
	type LogEntry,
	type LogEntryFn,
	type LogLevelType,
	type Logger,
} from "./log.type.ts";

let logger: Logger | undefined = undefined;

export function createLogger(logConfig: LogConfig): Logger {
	if (logger) {
		return logger;
	}

	const transports = logConfig.transports.map((transportConfig) => {
		switch (transportConfig.type) {
			case "console":
				return createConsoleTransport(transportConfig);
			case "file":
				return createFileTransport(transportConfig);
			default:
				throw new Error(`Unsupported transport type: ${transportConfig.type}`);
		}
	});

	const logEntryFn: LogEntryFn = (logEntry: LogEntry) => {
		for (const transport of transports) {
			const logLevel =
				LOG_LEVELS.find((ll) => ll.level === logEntry.level) || LOG_LEVELS[0];
			const transportMinLevel =
				LOG_LEVELS.find((ll) => ll.level === transport.minLevel) ||
				LOG_LEVELS[0];
			if (logLevel.id < transportMinLevel.id) {
				continue;
			}
			transport.write(logEntry);
		}
	};

	const createLogEntryFn = (
		level: LogLevelType,
		message: string,
		context?: unknown,
	) => {
		return logEntryFn({
			level,
			message,
			context,
			timestamp: new Date().toISOString(),
		});
	};
	logger = {
		debug: (message, context) => createLogEntryFn("debug", message, context),
		info: (message, context) => createLogEntryFn("info", message, context),
		warn: (message, context) => createLogEntryFn("warn", message, context),
		error: (message, context) => createLogEntryFn("error", message, context),
	};

	return logger;
}

export function getLogger(): Logger {
	if (!logger) {
		return createLogger(DEFAULT_LOG_CONFIG);
	}
	return logger;
}
