// node:fs async utilities

import fs from "node:fs/promises";

export async function readFile(path: string): Promise<string> {
	return fs.readFile(path, "utf-8");
}

export async function writeFile(path: string, data: string): Promise<void> {
	return fs.writeFile(path, data);
}

export async function readJsonFile<T>(path: string): Promise<T> {
	const data = await readFile(path);
	return JSON.parse(data);
}

export async function writeJsonFile(
	path: string,
	data: unknown,
): Promise<void> {
	const json = JSON.stringify(data);
	return writeFile(path, json);
}

export async function appendLine(path: string, line: string): Promise<void> {
	return fs.appendFile(path, `${line}\n`);
}
