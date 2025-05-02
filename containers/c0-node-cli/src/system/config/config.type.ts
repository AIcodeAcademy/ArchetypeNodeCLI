import { DEFAULT_LOG_CONFIG, type LogConfig } from "../log/log-config.type.ts";

export type Config = {
	log: LogConfig;
};

export const DEFAULT_CONFIG: Config = {
	log: DEFAULT_LOG_CONFIG,
};
