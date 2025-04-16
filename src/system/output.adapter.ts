/**
 * Output adapter for terminal styling and formatting
 * Wraps the chalk library to decouple it from the application
 */

import chalk from "chalk";

/**
 * Available colors for text styling
 */
export type TextColor =
	| "red"
	| "green"
	| "blue"
	| "yellow"
	| "magenta"
	| "cyan"
	| "gray"
	| "white";

/**
 * Style configuration for text output
 */
export type TextStyleConfig = {
	color?: TextColor;
	bold?: boolean;
	underline?: boolean;
	dim?: boolean;
};

/**
 * Apply styling to text based on configuration
 */
export const applyTextStyle = (
	text: string,
	style?: TextStyleConfig,
): string => {
	if (!style) {
		return text;
	}

	let styledText = text;

	if (style.color) {
		styledText = chalk[style.color](styledText);
	}

	if (style.bold) {
		styledText = chalk.bold(styledText);
	}

	if (style.underline) {
		styledText = chalk.underline(styledText);
	}

	if (style.dim) {
		styledText = chalk.dim(styledText);
	}

	return styledText;
};

/**
 * Output formatting functions
 */
export const outputFormatter = {
	/**
	 * Format text with color
	 */
	color: (text: string, color: TextColor): string => {
		return chalk[color](text);
	},

	/**
	 * Format text as bold
	 */
	bold: (text: string): string => {
		return chalk.bold(text);
	},

	/**
	 * Format text as underlined
	 */
	underline: (text: string): string => {
		return chalk.underline(text);
	},

	/**
	 * Format text as dimmed
	 */
	dim: (text: string): string => {
		return chalk.dim(text);
	},

	/**
	 * Format success symbol and text
	 */
	success: (text: string): string => {
		return `${chalk.green("✓")} ${chalk.green(text)}`;
	},

	/**
	 * Format error symbol and text
	 */
	error: (text: string): string => {
		return `${chalk.red("✗")} ${chalk.red(text)}`;
	},

	/**
	 * Format warning symbol and text
	 */
	warning: (text: string): string => {
		return `${chalk.yellow("⚠")} ${chalk.yellow(text)}`;
	},

	/**
	 * Format info symbol and text
	 */
	info: (text: string): string => {
		return `${chalk.blue("ℹ")} ${chalk.blue(text)}`;
	},
};
