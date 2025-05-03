import fs from "node:fs/promises";
import { directory } from "./directory.adapter.ts";

const ENCODING = "utf-8";

export const file = {
	async read(path: string): Promise<string> {
		const content = await fs.readFile(path, ENCODING);
		return content;
	},
	async write(path: string, content: string): Promise<void> {
		await directory.make(path);
		await fs.writeFile(path, content, ENCODING);
	},
	async delete(path: string): Promise<void> {
		await fs.unlink(path);
	},
	async exists(path: string): Promise<boolean> {
		return await fs
			.access(path)
			.then(() => true)
			.catch(() => false);
	},
};
