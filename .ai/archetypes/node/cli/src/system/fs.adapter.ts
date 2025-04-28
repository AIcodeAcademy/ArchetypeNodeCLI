import fs from "node:fs/promises";

const ENCODING = "utf-8";

/**
 * File system adapter
 *
 * @description Adapts the Node.js fs module to a more generic interface
 * @example
 * const data = await fsAdapter.readFile("file.txt");
 */
export const fsAdapter = {
	readFile: async (path: string): Promise<string> => {
		return fs.readFile(path, ENCODING);
	},

	writeFile: async (path: string, data: string): Promise<void> => {
		return fs.writeFile(path, data);
	},

	appendLine: async (path: string, line: string): Promise<void> => {
		return fs.appendFile(path, `${line}\n`);
	},
};
