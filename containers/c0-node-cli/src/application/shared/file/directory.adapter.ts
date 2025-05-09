import fs from "node:fs/promises";
import { dirname } from "node:path";

export const directory = {
	async exists(path: string): Promise<boolean> {
		return await fs
			.access(path)
			.then(() => true)
			.catch(() => false);
	},
	async make(path: string): Promise<void> {
		const dirName = dirname(path);
		if (dirName && !(await directory.exists(dirName))) {
			await fs.mkdir(dirName, { recursive: true });
		}
	},
	async getName(path: string): Promise<string> {
		return dirname(path);
	},
	async read(path: string): Promise<string[]> {
		return await fs.readdir(path);
	},
};
