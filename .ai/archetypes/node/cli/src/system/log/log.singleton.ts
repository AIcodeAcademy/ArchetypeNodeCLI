import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type { LogEntry, LogLevelType, LogTransport } from "./log.type.ts";
import { transportFactory } from "./transport.factory.ts";

export class Log {
	private static instance: Log | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: LogTransport[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = logConfig.transports.map((transportConfig) => {
			const transport = transportFactory(transportConfig);
			return transport;
		});
	}

	public static getInstance(logConfig?: LogConfig): Log {
		if (Log.instance) {
			return Log.instance;
		}
		if (!logConfig) {
			const temporalDefaultLogger = new Log(DEFAULT_LOG_CONFIG);
			return temporalDefaultLogger;
		}
		Log.instance = new Log(logConfig);
		return Log.instance;
	}

	debug(message: string, context?: unknown) {
		this.write(this.createEntry("debug", message, context));
	}

	info(message: string, context?: unknown) {
		this.write(this.createEntry("info", message, context));
	}

	warn(message: string, context?: unknown) {
		this.write(this.createEntry("warn", message, context));
	}

	error(message: string, context?: unknown) {
		this.write(this.createEntry("error", message, context));
	}
	createEntry(level: LogLevelType, message: string, context?: unknown) {
		return {
			level,
			message,
			context,
			timestamp: new Date().toISOString(),
		};
	}
	write(logEntry: LogEntry) {
		for (const transport of this.transports) {
			if (logEntry.level < this.logConfig.minLevel) {
				continue;
			}
			transport.write(logEntry);
		}
	}
}

export const getLog = () => Log.getInstance();
