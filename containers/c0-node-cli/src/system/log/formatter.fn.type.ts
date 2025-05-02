import type { LogEntry } from "./log-entry.type";
export type FormatterOptions = {
	addTimestamp?: boolean;
};
export type FormatterFn = (
	logEntry: LogEntry,
	options: FormatterOptions,
) => string;
