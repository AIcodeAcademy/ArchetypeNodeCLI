import { styleText } from "node:util";

export const styleError = (text: string) => {
	return styleText(["red", "bold"], text);
};
export const styleWarning = (text: string) => {
	return styleText(["green", "bold"], text);
};
export const styleInfo = (text: string) => {
	return styleText(["green"], text);
};
export const styleDebug = (text: string) => {
	return styleText(["red"], text);
};
