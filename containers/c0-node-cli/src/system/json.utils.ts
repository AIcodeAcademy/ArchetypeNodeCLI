import { fsAdapter } from "./fs.adapter.ts";

export const jsonUtils = {
	readFromFile: async <T>(path: string): Promise<T> => {
		const data = await fsAdapter.readFile(path);
		return JSON.parse(data);
	},
	writeToFile: async (path: string, data: unknown): Promise<void> => {
		const json = JSON.stringify(data);
		return fsAdapter.writeFile(path, json);
	},
};
