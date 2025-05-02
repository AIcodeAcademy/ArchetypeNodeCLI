import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogLevelType } from "./log-level.type.ts";
import type { TransportWrite } from "./transport-write.interface.ts";
import { transportFactory } from "./transport.factory.ts";

// ToDo: refactor with D.I. or something more testable

export interface WriteLevel {
	debug: (message: string, context?: unknown) => void;
	info: (message: string, context?: unknown) => void;
	warn: (message: string, context?: unknown) => void;
	error: (message: string, context?: unknown) => void;
}

export class Log implements WriteLevel {
	private static instance: Log | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: TransportWrite[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = (logConfig.transports ?? [])
			.map((transportConfig) => transportFactory.create(transportConfig))
			.filter((t): t is TransportWrite => !!t);
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

	public debug(message: string, context?: unknown) {
		this.write(this.createLogEntry("debug", message, context));
	}

	public info(message: string, context?: unknown) {
		this.write(this.createLogEntry("info", message, context));
	}

	public warn(message: string, context?: unknown) {
		this.write(this.createLogEntry("warn", message, context));
	}

	public error(message: string, context?: unknown) {
		this.write(this.createLogEntry("error", message, context));
	}

	private createLogEntry(
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

export const log = Log.getInstance();
export const logBuilder = Log.initInstance;
