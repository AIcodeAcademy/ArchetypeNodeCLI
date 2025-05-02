import type { LogEntry } from "./log-entry.type";

export interface TransportWrite {
	write: (logEntry: LogEntry) => void;
}
