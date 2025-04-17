/**
 * @module logger.adapter
 * @description Adapter for console logging with colors using chalk.
 */
import chalk from "chalk";

// Define log functions with specific colors
export const logInfo = (message: string): void => {
	console.log(chalk.blue(message));
};

export const logWarn = (message: string): void => {
	console.warn(chalk.yellow(message));
};

export const logError = (message: string): void => {
	console.error(chalk.red(message));
};

export const logSuccess = (message: string): void => {
	console.log(chalk.green(message));
};

export const logDebug = (message: string): void => {
	// Use a less prominent color for debug messages
	console.log(chalk.gray(message));
};
