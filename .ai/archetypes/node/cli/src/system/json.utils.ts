import { readFile, writeFile } from "./fs.adapter.ts";

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
