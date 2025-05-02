import { jsonUtils } from "../json.utils.ts";
import { type Config, DEFAULT_CONFIG } from "./config.type.ts";
/*
export class ConfigRepository {
	private config: Config | undefined;
	private readonly path: string;

	constructor(path: string, config?: Config) {
		this.path = path;
		this.config = config;
	}

	async getConfig(): Promise<Config> {
		if (this.config) return this.config;
		try {
			this.config = await jsonUtils.readFromFile<Config>(this.path);
		} catch (error) {
			this.config = DEFAULT_CONFIG;
		}
		return this.config;
	}
}
  */

let config: Config | undefined;
export const configRepository = {
	async getConfig(path: string): Promise<Config> {
		if (config) return config;
		try {
			config = await jsonUtils.readFromFile<Config>(path);
		} catch (error) {
			config = DEFAULT_CONFIG;
		}
		return config;
	},
};
