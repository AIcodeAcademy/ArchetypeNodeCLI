import {
	csvFormatter,
	jsonFormatter,
	prettyFormatter,
} from "./log.formatter.ts";
import type { LogEntry, LogTransport } from "./log.type.ts";

export class ConsoleTransporter {
	private readonly config: Partial<LogTransport>;

	constructor(config: Partial<LogTransport>) {
		this.config = config;
	}

	public write(logEntry: LogEntry) {
		if (this.config.minLevel && logEntry.level < this.config.minLevel) {
			return;
		}
		if (this.config.timestamp && !logEntry.timestamp) {
			logEntry.timestamp = new Date().toISOString();
		}
		if (!this.config.formatters) {
			return;
		}
		for (const formatter of this.config.formatters) {
			if (formatter === "pretty") {
				console.log(prettyFormatter(logEntry));
			}
			if (formatter === "csv") {
				console.log(csvFormatter(logEntry));
			}
			if (formatter === "json") {
				console.log(jsonFormatter(logEntry));
			}
		}
	}
}
