import type { LogConfig } from "./log-config.type.ts";
import { Log } from "./log.singleton.ts";

export const initLog = (logConfig: LogConfig) => Log.initInstance(logConfig);

export const getLog = () => Log.getInstance();
