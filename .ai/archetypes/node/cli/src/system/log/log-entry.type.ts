import type { LogLevelType } from "./log-level.type.ts";

export type LogEntry = {
	level: LogLevelType;
	message: string;
	context?: unknown;
	timestamp: string;
};
