import type { LogLevelType, LogTransportConfig } from "./log.type.ts";
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
