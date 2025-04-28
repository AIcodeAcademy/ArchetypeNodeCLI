import { readJsonFile, writeJsonFile } from "../system/json.utils.ts";

export const cache = {
	save: async <T>(key: string, value: T) => {
		const data = {
			value,
			timestamp: Date.now(),
		};
		const path = `./${key}.json`;
		writeJsonFile(path, data);
	},
	load: async <T>(key: string): Promise<T | undefined> => {
		const path = `./${key}.json`;
		try {
			const data = await readJsonFile<{ value: T; timestamp: number }>(path);
			return data.value;
		} catch (error) {
			return undefined;
		}
	},
};
