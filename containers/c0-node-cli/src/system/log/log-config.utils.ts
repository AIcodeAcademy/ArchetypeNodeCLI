import { environment } from "../env/env.adapter.ts";
import type { LogLevel } from "./log-entry.type.ts";
import type { LogRepository } from "./log-repository.type.ts";

let configRepositories: LogRepositoryConfig[] | undefined = undefined;
const DEFAULT_REPOSITORIES: LogRepositoryConfig[] = [
	{
		repository: "console",
		minLevel: "info",
	},
];

export type LogRepositoryConfig = {
	repository: LogRepository;
	minLevel: LogLevel;
};

export function getConfigRepositories(): LogRepositoryConfig[] {
	console.log("getConfigRepositories", configRepositories);
	if (configRepositories) {
		return configRepositories;
	}
	try {
		const envRepositories = environment.getEntry("LOG_REPOSITORIES");
		if (Array.isArray(envRepositories)) {
			configRepositories = envRepositories.map((repository) => ({
				repository: repository as LogRepository,
				minLevel: environment.getEntry(
					`LOG_${repository.toUpperCase()}_MIN_LEVEL`,
				) as LogLevel,
			}));
		}
	} catch (error) {
		console.error("Error getting config repositories", error);
	}
	return configRepositories || DEFAULT_REPOSITORIES;
}
