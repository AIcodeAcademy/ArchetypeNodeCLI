export type LogLevelType = "debug" | "info" | "warn" | "error";

export type LogLevel = {
	id: number;
	level: LogLevelType;
};

export const LOG_LEVELS: LogLevel[] = [
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
