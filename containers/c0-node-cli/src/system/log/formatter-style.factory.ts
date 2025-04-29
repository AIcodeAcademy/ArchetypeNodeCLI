import { styleTextAdapter } from "../style-text.adapter.ts";
import type { LogLevelType } from "./log-level.type.ts";

export function styleTextFactory(level: LogLevelType) {
	const styleFn = levelStyleMap[level];
	if (!styleFn) return (text: string) => text;
	return styleFn;
}

function styleError(text: string) {
	return styleTextAdapter(["red"], ["bold"], text);
}

function styleWarning(text: string) {
	return styleTextAdapter(["green"], ["bold"], text);
}

function styleInfo(text: string) {
	return styleTextAdapter(["green"], [], text);
}

function styleDebug(text: string) {
	return styleTextAdapter(["red"], [], text);
}

const levelStyleMap: Record<LogLevelType, (msg: string) => string> = {
	error: styleError,
	warn: styleWarning,
	info: styleInfo,
	debug: styleDebug,
};
