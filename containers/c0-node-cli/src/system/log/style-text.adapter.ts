import { styleText } from "node:util";

type Color = "red" | "green" | "blue" | "yellow" | "black" | "white";
type Modifier = "bold" | "italic" | "underline" | "strikethrough";

export const styleTextAdapter = {
	styleText(colors: Color[], modifiers: Modifier[], text: string) {
		const styleArgs = [colors, modifiers].flat();
		return styleText(styleArgs, text);
	},
};
