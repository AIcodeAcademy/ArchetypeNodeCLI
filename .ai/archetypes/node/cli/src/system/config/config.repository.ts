import { readJsonFile } from "../fs.util.ts";
import type { Config } from "./config.type";

export async function readConfig(configFile: string): Promise<Config> {
	const config = await readJsonFile<Config>(configFile);
	return config;
}
