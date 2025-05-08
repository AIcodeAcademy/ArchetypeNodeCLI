export type LogLevelName = "debug" | "info" | "warn" | "error";

export type LogLevel = {
	name: LogLevelName;
	rank: number;
	color: "green" | "red";
	style: "bold" | "italic";
};

export const LOG_LEVELS: Record<LogLevelName, LogLevel> = {
	debug: { name: "debug", rank: 0, color: "red", style: "italic" },
	info: { name: "info", rank: 1, color: "green", style: "italic" },
	warn: { name: "warn", rank: 2, color: "green", style: "bold" },
	error: { name: "error", rank: 3, color: "red", style: "bold" },
};
