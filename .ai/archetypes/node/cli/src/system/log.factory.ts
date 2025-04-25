import { createFileTransport } from "./fs-transporter.utils.ts";
import { createConsoleTransport } from "./log-transporters.util.ts";
import type { LogConfig, LogEntry, LogEntryFn, Logger } from "./log.type.ts";

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
			transport.write(logEntry);
		}
	};

	logger = {
		debug: (message, context) =>
			logEntryFn({ level: "debug", message, context }),
		info: (message, context) => logEntryFn({ level: "info", message, context }),
		warn: (message, context) => logEntryFn({ level: "warn", message, context }),
		error: (message, context) =>
			logEntryFn({ level: "error", message, context }),
		fatal: (message, context) =>
			logEntryFn({ level: "fatal", message, context }),
	};

	return logger;
}
