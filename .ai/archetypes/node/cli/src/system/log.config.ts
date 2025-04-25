import type { LogConfig } from "./log.type.ts";

export const logConfig: LogConfig = {
	minLevel: "debug",
	transports: [
		{
			type: "console",
			minLevel: "debug",
			formatters: ["pretty", "csv", "json"],
			timestamp: true,
		},
		{
			type: "file",
			minLevel: "debug",
			formatters: ["csv"],
			timestamp: true,
			path: "log.csv",
		},
	],
};
