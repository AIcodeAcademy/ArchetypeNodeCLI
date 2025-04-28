import fs from "node:fs/promises";

export async function readFile(path: string): Promise<string> {
	return fs.readFile(path, "utf-8");
}

export async function writeFile(path: string, data: string): Promise<void> {
	return fs.writeFile(path, data);
}

export async function appendLine(path: string, line: string): Promise<void> {
	return fs.appendFile(path, `${line}\n`);
}
