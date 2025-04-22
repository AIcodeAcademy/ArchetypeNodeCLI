import { readFile } from "fs/promises";
import { EnvironmentVariables } from "../types/environment-variable.type.js";

/**
 * Repository for handling environment files
 */
export class EnvFileRepository {
	/**
	 * Reads an environment file and returns its contents as environment variables
	 * @param filePath Path to the environment file
	 * @returns Promise resolving to environment variables
	 */
	async readEnvFile(filePath: string): Promise<EnvironmentVariables> {
		try {
			const content = await readFile(filePath, "utf-8");
			return this.parseEnvContent(content);
		} catch (error) {
			if (
				error instanceof Error &&
				"code" in error &&
				error.code === "ENOENT"
			) {
				return {};
			}
			throw error;
		}
	}

	/**
	 * Parses environment file content into environment variables
	 * @param content Environment file content
	 * @returns Environment variables
	 */
	private parseEnvContent(content: string): EnvironmentVariables {
		const lines = content.split("\n");
		const envVars: EnvironmentVariables = {};

		for (const line of lines) {
			const trimmedLine = line.trim();

			// Skip empty lines and comments
			if (!trimmedLine || trimmedLine.startsWith("#")) {
				continue;
			}

			const [name, ...valueParts] = trimmedLine.split("=");
			const value = valueParts.join("=").trim();

			// Remove quotes if present
			const cleanValue = value.replace(/^['"]|['"]$/g, "");

			envVars[name.trim()] = {
				name: name.trim(),
				value: cleanValue,
				required: true,
			};
		}

		return envVars;
	}
}
