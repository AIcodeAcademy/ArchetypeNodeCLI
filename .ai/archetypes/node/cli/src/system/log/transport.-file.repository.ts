import { appendLine } from "../fs.adapter.ts";
import type { LogTransportConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import { formatLogEntry } from "./log-formatters.utils.ts";
import type { LogTransportWrite } from "./transport.factory.ts";

export class TransportFile implements LogTransportWrite {
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
