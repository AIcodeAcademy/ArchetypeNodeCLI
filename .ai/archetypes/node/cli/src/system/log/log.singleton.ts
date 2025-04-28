import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogLevelType } from "./log-level-type.ts";
import {
	type LogTransportWrite,
	transportFactory,
} from "./transport.factory.ts";

function createLogEntry(
	level: LogLevelType,
	message: string,
	context?: unknown,
): LogEntry {
	return {
		level,
		message,
		context,
		timestamp: new Date().toISOString(),
	};
}

export class Log {
	private static instance: Log | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: LogTransportWrite[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = (logConfig.transports ?? [])
			.map((transportConfig) => transportFactory(transportConfig))
			.filter((t): t is LogTransportWrite => !!t);
		if (this.transports.length === 0) {
			console.warn?.(
				"No valid log transports configured; logging will be disabled.",
			);
		}
	}

	public static getInstance(): Log {
		if (Log.instance) {
			return Log.instance;
		}
		const temporalDefaultLogger = new Log(DEFAULT_LOG_CONFIG);
		return temporalDefaultLogger;
	}

	public static initInstance(logConfig: LogConfig): Log {
		if (!Log.instance) {
			Log.instance = new Log(logConfig);
		}
		return Log.instance;
	}

	debug(message: string, context?: unknown) {
		this.write(createLogEntry("debug", message, context));
	}

	info(message: string, context?: unknown) {
		this.write(createLogEntry("info", message, context));
	}

	warn(message: string, context?: unknown) {
		this.write(createLogEntry("warn", message, context));
	}

	error(message: string, context?: unknown) {
		this.write(createLogEntry("error", message, context));
	}

	private write(logEntry: LogEntry) {
		for (const transport of this.transports) {
			if (logEntry.level < this.logConfig.minLevel) {
				continue;
			}
			try {
				transport.write(logEntry);
			} catch (err) {
				console.warn?.("Failed to write log entry:", err);
			}
		}
	}
}
