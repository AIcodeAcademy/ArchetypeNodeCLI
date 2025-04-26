import { ConsoleTransport } from "./console-transport.repository.ts";
import { FileTransport } from "./fs-transporter.repository.ts";
import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type { LogEntry, LogTransport } from "./log.type";

export class LogService {
	private static instance: LogService | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: LogTransport[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = logConfig.transports.map((transport) => {
			switch (transport.type) {
				case "console":
					return new ConsoleTransport(transport);
				case "file":
					return new FileTransport(transport);
				case "http":
					throw new Error("HTTP transport not implemented");
			}
		});
	}

	public static getInstance(logConfig?: LogConfig): LogService {
		if (LogService.instance) {
			return LogService.instance;
		}
		if (!logConfig) {
			return new LogService(DEFAULT_LOG_CONFIG);
		}
		LogService.instance = new LogService(logConfig);
		return LogService.instance;
	}

	debug(message: string, context?: unknown) {
		this.write({
			level: "debug",
			message,
			context,
			timestamp: new Date().toISOString(),
		});
	}

	info(message: string, context?: unknown) {
		this.write({
			level: "info",
			message,
			context,
			timestamp: new Date().toISOString(),
		});
	}

	warn(message: string, context?: unknown) {
		this.write({
			level: "warn",
			message,
			context,
			timestamp: new Date().toISOString(),
		});
	}

	error(message: string, context?: unknown) {
		this.write({
			level: "error",
			message,
			context,
			timestamp: new Date().toISOString(),
		});
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

export const logger = () => LogService.getInstance();
