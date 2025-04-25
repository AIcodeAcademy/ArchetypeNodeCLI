import fs from "node:fs/promises";

import { csvFormatter } from "./log-formatters.util.ts";
import type { LogEntry, LogTransport, LogTransportConfig } from "./log.type.ts";

const fileTransport: LogTransport | undefined = undefined;

export function createFileTransport(
	logTransportConfig: LogTransportConfig,
): LogTransport {
	if (fileTransport) {
		return fileTransport;
	}

	const writeFn = (logEntry: LogEntry) => {
		const message = csvFormatter(logEntry);
		const path = logTransportConfig.path ?? "log.csv";
		fs.appendFile(path, message);
	};

	return {
		type: "file",
		minLevel: logTransportConfig.minLevel ?? "debug",
		formatters: logTransportConfig.formatters ?? ["pretty"],
		timestamp: logTransportConfig.timestamp ?? true,
		write: writeFn,
	};
}
