import { styleText } from "node:util";
import type { LogLevelType } from "./log/log.type";

const styleError = (text: string) => {
	return styleText(["red", "bold"], text);
};
const styleWarning = (text: string) => {
	return styleText(["green", "bold"], text);
};
const styleInfo = (text: string) => {
	return styleText(["green"], text);
};
const styleDebug = (text: string) => {
	return styleText(["red"], text);
};

const levelStyleMap: Record<LogLevelType, (msg: string) => string> = {
	error: styleError,
	warn: styleWarning,
	info: styleInfo,
	debug: styleDebug,
};

export const styleTextFactory = (level: LogLevelType) => {
	const styleFn = levelStyleMap[level];
	if (!styleFn) return (text: string) => text;
	return styleFn;
};
