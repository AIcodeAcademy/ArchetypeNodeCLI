import type { LogConfig, LogEntry } from "./log.type.ts";

export class Log {
	private readonly config: LogConfig;

	constructor(config: LogConfig) {
		this.config = config;
	}

	public debug(message: string, context?: unknown) {
		this.log({
			level: "debug",
			message,
			context,
		});
	}

	public info(message: string, context?: unknown) {
		this.log({
			level: "info",
			message,
			context,
		});
	}

	public warn(message: string, context?: unknown) {
		this.log({
			level: "warn",
			message,
			context,
		});
	}

	public error(message: string, context?: unknown) {
		this.log({
			level: "error",
			message,
			context,
		});
	}

	public fatal(message: string, context?: unknown) {
		this.log({
			level: "fatal",
			message,
			context,
		});
	}

	private log(logEntry: LogEntry) {
		const transports = this.config.transports;
		for (const transport of transports) {
			if (transport.write) {
				transport.write(logEntry);
			}
		}
	}
}
