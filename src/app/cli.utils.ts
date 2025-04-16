/**
 * CLI output formatting utilities for enhanced user experience
 */

import readline from "node:readline";
import type { TextStyleConfig } from "../system/output.adapter.ts";
import { applyTextStyle, outputFormatter } from "../system/output.adapter.ts";

/**
 * utilities to be used in the CLI
 */
export {
	createMenu,
	createProgressBar,
	createSpinner,
	formatError,
	formatHeading,
	formatInfo,
	formatLabelValue,
	formatSuccess,
	formatTable,
	formatTitle,
	formatWarning,
	getArgs,
	getCommand,
	styleText,
};

/**
 * Style options for text output
 */
export type TextStyle = TextStyleConfig;

/**
 * Applies styles to text
 */
const styleText = (text: string, style?: TextStyle): string => {
	return applyTextStyle(text, style);
};

/**
 * Formats a title with optional styling
 */
const formatTitle = (title: string, style?: TextStyle): string => {
	const defaultStyle: TextStyle = {
		color: "blue",
		bold: true,
		...style,
	};

	return `\n${styleText(title, defaultStyle)}\n${styleText("=".repeat(title.length), defaultStyle)}\n`;
};

/**
 * Formats a section heading with optional styling
 */
const formatHeading = (heading: string, style?: TextStyle): string => {
	const defaultStyle: TextStyle = {
		color: "cyan",
		bold: true,
		...style,
	};

	return `\n${styleText(heading, defaultStyle)}\n${styleText("-".repeat(heading.length), defaultStyle)}`;
};

/**
 * Formats a success message
 */
const formatSuccess = (message: string): string => {
	return outputFormatter.success(message);
};

/**
 * Formats an error message
 */
const formatError = (message: string): string => {
	return outputFormatter.error(message);
};

/**
 * Formats a warning message
 */
const formatWarning = (message: string): string => {
	return outputFormatter.warning(message);
};

/**
 * Formats an info message
 */
const formatInfo = (message: string): string => {
	return outputFormatter.info(message);
};

/**
 * Formats a label-value pair
 */
const formatLabelValue = (label: string, value: string): string => {
	return `${outputFormatter.color(label, "cyan")}: ${value}`;
};

/**
 * Table column definition
 */
export type TableColumn = {
	header: string;
	field: string;
	width?: number;
	align?: "left" | "right" | "center";
};

/**
 * Formats data as a table
 */
const formatTable = <T extends Record<string, unknown>>(
	data: T[],
	columns: TableColumn[],
): string => {
	if (data.length === 0) {
		return "No data to display";
	}

	// Calculate column widths if not specified
	const calculatedColumns = columns.map((col) => {
		if (col.width) {
			return col;
		}

		let maxWidth = col.header.length;

		for (const row of data) {
			const value = String(row[col.field] ?? "");
			maxWidth = Math.max(maxWidth, value.length);
		}

		return {
			...col,
			width: maxWidth + 2, // Add padding
		};
	});

	// Create header row
	const headerRow = calculatedColumns
		.map((col) => {
			const header = col.header.padEnd(col.width ?? 10);
			return outputFormatter.bold(header);
		})
		.join(" | ");

	// Create separator row
	const separatorRow = calculatedColumns
		.map((col) => {
			return "-".repeat(col.width ?? 10);
		})
		.join("-+-");

	// Create data rows
	const dataRows = data.map((row) => {
		return calculatedColumns
			.map((col) => {
				const value = String(row[col.field] ?? "");
				const width = col.width ?? 10;

				if (col.align === "right") {
					return value.padStart(width);
				} else if (col.align === "center") {
					const leftPad = Math.floor((width - value.length) / 2);
					return " ".repeat(leftPad) + value.padEnd(width - leftPad);
				} else {
					return value.padEnd(width);
				}
			})
			.join(" | ");
	});

	return [headerRow, separatorRow, ...dataRows].join("\n");
};

/**
 * Progress bar configuration
 */
type ProgressBarOptions = {
	total: number;
	width?: number;
	completeChar?: string;
	incompleteChar?: string;
	renderThrottle?: number;
};

/**
 * Creates a progress bar for CLI
 */
const createProgressBar = (options: ProgressBarOptions) => {
	const total = options.total;
	const width = options.width || 40;
	const completeChar = options.completeChar || "█";
	const incompleteChar = options.incompleteChar || "░";
	const renderThrottle = options.renderThrottle || 100;

	let current = 0;
	let lastRender = 0;

	const render = () => {
		const now = Date.now();
		const percentage = Math.min(Math.floor((current / total) * 100), 100);
		const completeWidth = Math.round((width * current) / total);
		const incompleteWidth = width - completeWidth;

		const bar =
			completeChar.repeat(completeWidth) +
			incompleteChar.repeat(incompleteWidth);
		const line = `${percentage}% [${bar}] ${current}/${total}`;

		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(line);

		lastRender = now;
	};

	return {
		update: (value: number) => {
			current = value;
			const now = Date.now();

			if (now - lastRender > renderThrottle) {
				render();
			}
		},
		increment: (value = 1) => {
			current = Math.min(current + value, total);
			const now = Date.now();

			if (now - lastRender > renderThrottle) {
				render();
			}
		},
		complete: () => {
			current = total;
			render();
			console.log(); // Move to next line
		},
	};
};

/**
 * Spinner animation frames
 */
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

/**
 * Creates a spinner for CLI operations
 */
const createSpinner = (message: string) => {
	let frameIndex = 0;
	let intervalId: NodeJS.Timeout | undefined;
	let isRunning = false;
	let text = message;

	const render = () => {
		const frame = outputFormatter.color(SPINNER_FRAMES[frameIndex], "blue");
		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(`${frame} ${text}`);
		frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
	};

	return {
		start: () => {
			if (isRunning) return;

			isRunning = true;
			frameIndex = 0;
			intervalId = setInterval(render, 80);
			render();

			return {
				stop: () => {
					if (!isRunning) return;

					clearInterval(intervalId);
					isRunning = false;
					readline.clearLine(process.stdout, 0);
					readline.cursorTo(process.stdout, 0);
				},

				update: (newMessage: string) => {
					text = newMessage;
				},

				succeed: (successMessage?: string) => {
					if (!isRunning) return;

					clearInterval(intervalId);
					isRunning = false;
					readline.clearLine(process.stdout, 0);
					readline.cursorTo(process.stdout, 0);
					process.stdout.write(`${formatSuccess(successMessage || text)}\n`);
				},

				fail: (errorMessage?: string) => {
					if (!isRunning) return;

					clearInterval(intervalId);
					isRunning = false;
					readline.clearLine(process.stdout, 0);
					readline.cursorTo(process.stdout, 0);
					process.stdout.write(`${formatError(errorMessage || text)}\n`);
				},

				warn: (warningMessage?: string) => {
					if (!isRunning) return;

					clearInterval(intervalId);
					isRunning = false;
					readline.clearLine(process.stdout, 0);
					readline.cursorTo(process.stdout, 0);
					process.stdout.write(`${formatWarning(warningMessage || text)}\n`);
				},
			};
		},
	};
};

/**
 * Creates a simple interactive menu
 */
const createMenu = async <T extends string>(
	title: string,
	options: { value: T; label: string }[],
): Promise<T> => {
	console.log(formatHeading(title));

	options.forEach((option, index) => {
		console.log(
			`${outputFormatter.color(`${index + 1}`, "cyan")}. ${option.label}`,
		);
	});

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const question = (prompt: string): Promise<string> => {
		return new Promise((resolve) => {
			rl.question(`\n${prompt}: `, (answer) => {
				resolve(answer);
			});
		});
	};

	let selectedOption: T | undefined;
	while (!selectedOption) {
		const answer = await question("Enter your choice (number)");
		const index = parseInt(answer, 10) - 1;

		if (Number.isNaN(index) || index < 0 || index >= options.length) {
			console.log(formatError("Invalid selection. Please try again."));
		} else {
			selectedOption = options[index].value;
		}
	}

	rl.close();
	return selectedOption;
};

function getCommand() {
	return process.argv[2] || "help";
}
function getArgs() {
	return process.argv.slice(3);
}
