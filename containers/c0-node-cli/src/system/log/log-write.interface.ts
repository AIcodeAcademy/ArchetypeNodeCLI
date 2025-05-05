import type { LogEntry } from "./log-entry.type.ts";

export interface LogRepositoryWriteEntry {
	write(entry: LogEntry): void;
}
