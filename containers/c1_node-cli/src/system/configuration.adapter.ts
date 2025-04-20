/**
 * @module configuration.adapter
 * @description Adapter for reading configuration files.
 */
import * as fs from "fs/promises";
import { FilePath } from "./system.type.ts";

/**
 * Reads a JSON configuration file.
 *
 * @param {FilePath} filePath - The path to the configuration file.
 * @returns {Promise<unknown>} A promise that resolves with the parsed JSON content.
 * @throws {Error} If the file cannot be read or parsed.
 */
export const readConfigurationFile = async (
	filePath: FilePath,
): Promise<unknown> => {
	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		return JSON.parse(fileContent);
	} catch (error) {
		// TODO: Improve error handling, maybe return a Result type
		if (error instanceof Error) {
			throw new Error(
				`Failed to read or parse configuration file "${filePath}": ${error.message}`,
			);
		}
		throw new Error(
			`Failed to read or parse configuration file "${filePath}": Unknown error`,
		);
	}
};
