import { styleText } from "node:util";

type Colors = "red" | "green" | "blue" | "yellow" | "black" | "white";
type Modifiers = "bold" | "italic" | "underline" | "strikethrough";

export const styleTextAdapter = {
	styleText(colors: Colors[], modifiers: Modifiers[], text: string) {
		const styleArgs = [colors, modifiers].flat();
		return styleText(styleArgs, text);
	},
};
