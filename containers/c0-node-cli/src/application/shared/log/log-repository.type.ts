import type { LogEntry } from "./log-entry.type.ts";
import { LOG_LEVELS, type LogLevel } from "./log-level.type.ts";

export type LogRepositoryName = "console" | "file";

export type LogRepository = {
	name: LogRepositoryName;
	minLevel: LogLevel;
};

export const DEFAULT_REPOSITORIES: LogRepository[] = [
	{
		name: "console",
		minLevel: LOG_LEVELS.info,
	},
];

export interface LogRepositoryWriteEntry {
	write(entry: LogEntry): void;
}
