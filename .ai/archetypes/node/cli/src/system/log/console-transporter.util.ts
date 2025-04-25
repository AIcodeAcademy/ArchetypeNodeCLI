import { formatLogEntry } from "./log-formatters.util.ts";
import type {
	LogEntry,
	LogTransport,
	LogTransportConfig,
	LogTransportType,
} from "./log.type.ts";

export function createConsoleTransport(
	logTransportConfig: LogTransportConfig,
): LogTransport {
	const consoleTransport = {
		type: "console" as LogTransportType,
		minLevel: logTransportConfig.minLevel ?? "debug",
		formatter: logTransportConfig.formatter ?? "pretty",
		timestamp: logTransportConfig.timestamp ?? false,
		write: (logEntry: LogEntry) => {
			const message: string = formatLogEntry(logEntry, logTransportConfig);
			console.log(message);
		},
	};

	return consoleTransport;
}
