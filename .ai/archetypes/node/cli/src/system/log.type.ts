export type LogFormatterType = "csv" | "json" | "pretty";
export type LogTransportType = "console" | "file" | "http";
export type LogLevelType = "debug" | "info" | "warn" | "error";

export const logLevels = [
	{
		id: 0,
		level: "debug",
	},
	{
		id: 1,
		level: "info",
	},
	{
		id: 2,
		level: "warn",
	},
	{
		id: 3,
		level: "error",
	},
];

export type LogConfig = {
	minLevel: LogLevelType;
	transports: LogTransportConfig[];
};

export type LogTransportConfig = {
	type: LogTransportType;
	minLevel: LogLevelType;
	formatters: LogFormatterType[];
	timestamp: boolean;
	path?: string;
};

export type LogTransport = LogTransportConfig & {
	write: (logEntry: LogEntry) => void;
};

export type LogEntry = {
	level: string;
	message: string;
	context?: unknown;
	timestamp?: string;
};
export type LogFn = (message: string, context?: unknown) => void;
export type LogEntryFn = (logEntry: LogEntry) => void;

export type Logger = {
	debug: LogFn;
	info: LogFn;
	warn: LogFn;
	error: LogFn;
	fatal: LogFn;
};
