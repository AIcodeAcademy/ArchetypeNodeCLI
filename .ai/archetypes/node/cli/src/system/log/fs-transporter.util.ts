import { appendLine } from "../fs.util.ts";
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
		write: async (logEntry: LogEntry) => {
			const message: string = formatLogEntry(logEntry, fileTransportConfig);
			const path = fileTransportConfig.path ?? "log.csv";
			await appendLine(path, message);
		},
	};

	return fileTransport;
}
