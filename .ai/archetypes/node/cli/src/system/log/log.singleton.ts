import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type { LogEntry, LogLevelType, LogTransport } from "./log.type.ts";
import { transportFactory } from "./transport.factory.ts";

/**
 * Creates a log entry object.
 */
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

/**
 * Handles logging logic and transport management.
 */
class Log {
	private static instance: Log | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: LogTransport[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = (logConfig.transports ?? [])
			.map((transportConfig) => transportFactory(transportConfig))
			.filter((t): t is LogTransport => !!t);
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
		if (!this.transports || this.transports.length === 0) {
			// No transports, nothing to do
			return;
		}
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

export const initLog = (logConfig: LogConfig) => Log.initInstance(logConfig);
export const getLog = () => Log.getInstance();
