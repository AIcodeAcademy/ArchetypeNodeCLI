import { styleText } from "node:util";

type Color = "red" | "green" | "blue" | "yellow" | "black" | "white";
type Modifier = "bold" | "italic" | "underline" | "strikethrough";

/**
 * Adapter for styling text output in the CLI.
 * Provides methods for applying colors and text styles to console output.
 */
export const styleTextAdapter = {
	/**
	 * Applies specified colors and modifiers to text.
	 */
	styleText(colors: Color[], modifiers: Modifier[], text: string): string {
		const styleArgs = [colors, modifiers].flat();
		return styleText(styleArgs, text);
	},
};
