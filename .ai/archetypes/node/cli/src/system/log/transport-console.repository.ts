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
		console.log(message);
		if (logEntry.context) {
			console.log(logEntry.context);
		}
	}
}
