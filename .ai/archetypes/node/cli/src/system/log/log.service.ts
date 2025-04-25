import { ConsoleTransport } from "./console-transport.repository.ts";
import { FileTransport } from "./fs-transporter.repository.ts";
import type { LogConfig } from "./log-config.type.ts";
import type { LogEntry, LogTransport } from "./log.type";

export class LogService {
	private readonly logConfig: LogConfig;

	private readonly transports: LogTransport[];

	constructor(logConfig: LogConfig) {
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
