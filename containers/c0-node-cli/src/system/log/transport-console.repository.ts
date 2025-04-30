import { formatLogEntry } from "./formatter.utils.ts";
import type { LogTransportConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogTransportWrite } from "./transport.factory.ts";

export class TransportConsole implements LogTransportWrite {
	private logTransportConfig: LogTransportConfig;

	constructor(logTransportConfig: LogTransportConfig) {
		this.logTransportConfig = logTransportConfig;
	}

	public write(logEntry: LogEntry) {
		const message: string = formatLogEntry(logEntry, this.logTransportConfig);

		// Use appropriate console method based on log level
		switch (logEntry.level) {
			case "error":
				console.error(message);
				if (logEntry.context) {
					console.error(logEntry.context);
				}
				break;
			case "warn":
				console.warn(message);
				if (logEntry.context) {
					console.warn(logEntry.context);
				}
				break;
			default:
				console.log(message);
				if (logEntry.context) {
					console.log(logEntry.context);
				}
		}
	}
}
