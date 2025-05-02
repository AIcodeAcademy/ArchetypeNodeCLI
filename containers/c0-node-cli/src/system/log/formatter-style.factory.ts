import { styleTextAdapter } from "../style-text.adapter.ts";
import type { LogLevelType } from "./log-level.type.ts";
type StyleFn = (text: string) => string;
export const formatterStyleFactory = {
	create(level: LogLevelType): StyleFn {
		const styleFn = levelStyleMap[level];
		if (!styleFn) return (text: string) => text;
		return styleFn;
	},
};

function styleError(text: string) {
	return styleTextAdapter.styleText(["red"], ["bold"], text);
}

function styleWarning(text: string) {
	return styleTextAdapter.styleText(["green"], ["bold"], text);
}

function styleInfo(text: string) {
	return styleTextAdapter.styleText(["green"], [], text);
}

function styleDebug(text: string) {
	return styleTextAdapter.styleText(["red"], [], text);
}

const levelStyleMap: Record<LogLevelType, StyleFn> = {
	error: (text: string) => styleError(text),
	warn: (text: string) => styleWarning(text),
	info: (text: string) => styleInfo(text),
	debug: (text: string) => styleDebug(text),
};
