import type { LogLevel } from "./log-level.type";

export type LogEntry = {
	level: LogLevel;
	message: string;
	source?: string;
	context?: Record<string, unknown>;
	timestamp: number;
};
