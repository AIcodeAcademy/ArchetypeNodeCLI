import {
	type FormatterFn,
	type FormatterOptions,
	formatterFactory,
} from "./formatter.factory.ts";
import type { LogTransportConfig } from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";

export function formatLogEntry(
	logEntry: LogEntry,
	logTransportConfig: LogTransportConfig,
) {
	const formatter: FormatterFn = formatterFactory(logTransportConfig);
	const options: FormatterOptions = {
		addTimestamp: logTransportConfig.timestamp,
	};
	return formatter(logEntry, options);
}
