import { styleText } from "node:util";

type Colors = "red" | "green" | "blue" | "yellow" | "black" | "white";
type Modifiers = "bold" | "italic" | "underline" | "strikethrough";

/**
 * Style text adapter
 *
 * @description Adapts the Node.js util.styleText function to a more generic interface
 * @example
 * const styledText = styleTextAdapter(["red"], ["bold"], "Hello, world!");
 */
export function styleTextAdapter(
	colors: Colors[],
	modifiers: Modifiers[],
	text: string,
) {
	const styleArgs = [colors, modifiers].flat();
	return styleText(styleArgs, text);
}
