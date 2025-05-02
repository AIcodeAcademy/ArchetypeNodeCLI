import fs from "node:fs/promises";

const ENCODING = "utf-8";

export const fsAdapter = {
	readFile: async (path: string): Promise<string> =>
		fs.readFile(path, ENCODING),

	writeFile: async (path: string, data: string): Promise<void> =>
		fs.writeFile(path, data),

	appendLine: async (path: string, line: string): Promise<void> =>
		fs.appendFile(path, `${line}\n`),

	deleteFile: async (path: string): Promise<void> => fs.unlink(path),

	ensureDirectoryExists: async (path: string): Promise<void> => {
		const dir = getDirectoryName(path);
		if (!dir) {
			return;
		}
		if (!(await exists(dir))) {
			await fs.mkdir(dir, { recursive: true });
		}
	},
};

function getDirectoryName(path: string): string {
	return path.split("/").slice(0, -1).join("/");
}

async function exists(path: string): Promise<boolean> {
	try {
		await fs.stat(path);
		return true;
	} catch {
		return false;
	}
}
