import { appendLine } from "../fs.utils.ts";
import { formatLogEntry } from "./log-formatters.utils.ts";
import type { LogEntry, LogTransport, LogTransportConfig } from "./log.type.ts";

export class FileTransport implements LogTransport {
	private logTransportConfig: LogTransportConfig;

	constructor(logTransportConfig: LogTransportConfig) {
		this.logTransportConfig = logTransportConfig;
	}

	async write(logEntry: LogEntry) {
		const message: string = formatLogEntry(logEntry, this.logTransportConfig);
		const path = this.logTransportConfig.path ?? "log.csv";
		await appendLine(path, message);
	}
}
