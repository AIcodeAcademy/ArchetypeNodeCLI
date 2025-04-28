import { appendLine } from "../fs.utils.ts";
import type {
	LogEntry,
	LogTransport,
	LogTransportConfig,
} from "./log-entry.type.ts";
import { formatLogEntry } from "./log-formatters.utils.ts";

export class TransportFile implements LogTransport {
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
