import { styleTextAdapter } from "../style-text.adapter.ts";
import type { LogLevelType } from "./log-level.type.ts";

const styleError = (text: string) => {
	return styleTextAdapter(["red"], ["bold"], text);
};
const styleWarning = (text: string) => {
	return styleTextAdapter(["green"], ["bold"], text);
};
const styleInfo = (text: string) => {
	return styleTextAdapter(["green"], [], text);
};
const styleDebug = (text: string) => {
	return styleTextAdapter(["red"], [], text);
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
