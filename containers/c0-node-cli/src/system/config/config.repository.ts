import { readJsonFile } from "../json.utils.ts";
import type { Config } from "./config.type.ts";

export async function readConfig(configFile: string): Promise<Config> {
	const config = await readJsonFile<Config>(configFile);
	return config;
}
