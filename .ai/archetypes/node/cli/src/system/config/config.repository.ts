import fs from "node:fs/promises";
import type { Config } from "./config.type";

export async function readConfig(configFile: string): Promise<Config> {
	const config = await fs.readFile(configFile, "utf8");
	return JSON.parse(config);
}
