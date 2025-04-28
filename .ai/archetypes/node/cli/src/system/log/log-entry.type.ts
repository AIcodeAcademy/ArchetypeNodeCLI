import type { LogLevelType } from "./log-level-type";

export type LogEntry = {
	level: LogLevelType;
	message: string;
	context?: unknown;
	timestamp: string;
};
