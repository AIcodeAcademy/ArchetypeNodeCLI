export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
	level: LogLevel;
	message: string;
	source: string;
	context?: Record<string, unknown>;
	timestamp: number;
};
