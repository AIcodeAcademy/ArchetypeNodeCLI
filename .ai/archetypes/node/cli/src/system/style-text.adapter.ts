import { styleText } from "node:util";

// Adapts the Node.js util.styleText function to a more generic interface

type Colors = "red" | "green" | "blue" | "yellow" | "black" | "white";
type Modifiers = "bold" | "italic" | "underline" | "strikethrough";

export function styleTextAdapter(
	colors: Colors[],
	modifiers: Modifiers[],
	text: string,
) {
	const styleArgs = [colors, modifiers].flat();
	return styleText(styleArgs, text);
}
