import { promises as fs } from "node:fs";
import { dirname } from "node:path";
import { fsAdapter } from "../fs.adapter.ts";
import { formatLogEntry } from "./formatter.utils.ts";
import type { LogTransportConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { TransportWrite } from "./transport-write.interface.ts";

export class TransportFileRepository implements TransportWrite {
	private readonly logTransportConfig: LogTransportConfig;

	constructor(logTransportConfig: LogTransportConfig) {
		this.logTransportConfig = logTransportConfig;
	}

	public async write(logEntry: LogEntry) {
		const message: string = formatLogEntry(logEntry, this.logTransportConfig);
		const path = this.logTransportConfig.path ?? "log.csv";

		// Create directory if it doesn't exist
		const dir = dirname(path);
		try {
			await fs.mkdir(dir, { recursive: true });
		} catch (err) {
			// Directory might already exist, that's fine
		}

		await fsAdapter.appendLine(path, message);
	}
}
