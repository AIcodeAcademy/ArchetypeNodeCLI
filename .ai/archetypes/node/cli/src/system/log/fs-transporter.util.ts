import fs from "node:fs/promises";
import { formatLogEntry } from "./log-formatters.util.ts";
import type {
	LogEntry,
	LogTransport,
	LogTransportConfig,
	LogTransportType,
} from "./log.type.ts";

export function createFileTransport(
	fileTransportConfig: LogTransportConfig,
): LogTransport {
	const fileTransport = {
		type: "file" as LogTransportType,
		minLevel: fileTransportConfig.minLevel ?? "debug",
		formatter: fileTransportConfig.formatter ?? "csv",
		timestamp: fileTransportConfig.timestamp ?? true,
		write: (logEntry: LogEntry) => {
			const message: string = formatLogEntry(logEntry, fileTransportConfig);
			const path = fileTransportConfig.path ?? "log.csv";
			fs.appendFile(path, message);
		},
	};

	return fileTransport;
}
