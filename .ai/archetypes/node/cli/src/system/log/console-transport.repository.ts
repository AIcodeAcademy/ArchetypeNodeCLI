import { formatLogEntry } from "./log-formatters.utils.ts";
import type { LogEntry, LogTransport, LogTransportConfig } from "./log.type.ts";

export class ConsoleTransport implements LogTransport {
	private logTransportConfig: LogTransportConfig;

	constructor(logTransportConfig: LogTransportConfig) {
		this.logTransportConfig = logTransportConfig;
	}

	write(logEntry: LogEntry) {
		const message: string = formatLogEntry(logEntry, this.logTransportConfig);
		console.log(message);
	}
}
