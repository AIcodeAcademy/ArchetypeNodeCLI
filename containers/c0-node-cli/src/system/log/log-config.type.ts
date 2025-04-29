import type { LogLevelType } from "./log-level.type.ts";

export type LogFormatterType = "csv" | "json" | "pretty";

export type LogTransportType = "console" | "file" | "http";

export type LogTransportConfig = {
	type: LogTransportType;
	minLevel: LogLevelType;
	formatter: LogFormatterType;
	timestamp: boolean;
	path?: string;
};

export type LogConfig = {
	minLevel: LogLevelType;
	transports: LogTransportConfig[];
};

export const DEFAULT_LOG_CONFIG: LogConfig = {
	minLevel: "debug",
	transports: [
		{
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: false,
		},
		{
			type: "file",
			minLevel: "warn",
			formatter: "csv",
			timestamp: true,
			path: "log.csv",
		},
	],
};
