import fs from "node:fs/promises";

const ENCODING = "utf-8";

export const fsAdapter = {
	readFile: async (path: string): Promise<string> =>
		fs.readFile(path, ENCODING),

	writeFile: async (path: string, data: string): Promise<void> =>
		fs.writeFile(path, data),

	appendLine: async (path: string, line: string): Promise<void> =>
		fs.appendFile(path, `${line}\n`),
};
