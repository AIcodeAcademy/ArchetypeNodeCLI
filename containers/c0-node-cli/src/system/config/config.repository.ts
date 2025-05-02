import { jsonUtils } from "../json.utils.ts";
import { type Config, DEFAULT_CONFIG } from "./config.type.ts";

let config: Config | undefined;
export const configRepository = {
	async load(path: string): Promise<Config> {
		if (config) return config;
		try {
			config = await jsonUtils.readFromFile<Config>(path);
		} catch (error) {
			config = DEFAULT_CONFIG;
		}
		return config;
	},
};
