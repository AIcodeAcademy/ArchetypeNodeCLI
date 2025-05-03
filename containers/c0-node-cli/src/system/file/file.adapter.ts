import fs from "node:fs/promises";
const ENCODING = "utf-8";

export const file = {
	async read(path: string): Promise<string> {
		const content = await fs.readFile(path, ENCODING);
		return content;
	},
	async write(path: string, content: string): Promise<void> {
		await this.makeDir(path);
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
	async makeDir(path: string): Promise<void> {
		const dirName = await this.getDirName(path);
		if (!(await this.exists(dirName))) {
			await fs.mkdir(dirName, { recursive: true });
		}
	},
	async getDirName(path: string): Promise<string> {
		return path.split("/").slice(0, -1).join("/");
	},
	async readDir(path: string): Promise<string[]> {
		return await fs.readdir(path);
	},
};
