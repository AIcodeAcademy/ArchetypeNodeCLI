import {
	csvFormatter,
	jsonFormatter,
	prettyFormatter,
} from "./log-formatters.util.ts";
import type { LogEntry, LogTransport, LogTransportConfig } from "./log.type.ts";

let consoleTransport: LogTransport | undefined = undefined;

export function createConsoleTransport(
	logTransportConfig: LogTransportConfig,
): LogTransport {
	if (consoleTransport) {
		return consoleTransport;
	}

	const writeFn = (logEntry: LogEntry) => {
		if (
			logTransportConfig.minLevel &&
			logEntry.level < logTransportConfig.minLevel
		) {
			return;
		}

		const enrichedEntry = logTransportConfig.timestamp
			? { ...logEntry, timestamp: new Date().toISOString() }
			: logEntry;

		for (const formatter of logTransportConfig.formatters ?? []) {
			let message: string;
			switch (formatter) {
				case "pretty":
					message = prettyFormatter(enrichedEntry);
					break;
				case "csv":
					message = csvFormatter(enrichedEntry);
					break;
				case "json":
					message = jsonFormatter(enrichedEntry);
					break;
			}
			console.log(message);
		}
	};

	consoleTransport = {
		type: "console",
		minLevel: logTransportConfig.minLevel ?? "debug",
		formatters: logTransportConfig.formatters ?? ["pretty"],
		timestamp: logTransportConfig.timestamp ?? true,
		write: writeFn,
	};

	return consoleTransport;
}
