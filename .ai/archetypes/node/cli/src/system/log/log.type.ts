export type LogFormatterType = "csv" | "json" | "pretty";
export type LogTransportType = "console" | "file" | "http";
export type LogLevelType = "debug" | "info" | "warn" | "error";

export type LogLevel = {
	id: number;
	level: LogLevelType;
	color: "red" | "yellow" | "green" | "cyan";
	style: "bold" | "italic" | "underline" | "dim";
};
export const LOG_LEVELS: LogLevel[] = [
	{
		id: 0,
		level: "debug",
		color: "cyan",
		style: "dim",
	},
	{
		id: 1,
		level: "info",
		color: "green",
		style: "dim",
	},
	{
		id: 2,
		level: "warn",
		color: "green",
		style: "bold",
	},
	{
		id: 3,
		level: "error",
		color: "red",
		style: "bold",
	},
];

export type LogTransportConfig = {
	type: LogTransportType;
	minLevel: LogLevelType;
	formatter: LogFormatterType;
	timestamp: boolean;
	path?: string;
};

export interface LogTransport {
	write: (logEntry: LogEntry) => void;
}

export type LogEntry = {
	level: LogLevelType;
	message: string;
	context?: unknown;
	timestamp: string;
};
type LogFn = (message: string, context?: unknown) => void;
type LogEntryFn = (logEntry: LogEntry) => void;

export type Logger = {
	debug: LogFn;
	info: LogFn;
	warn: LogFn;
	error: LogFn;
};
