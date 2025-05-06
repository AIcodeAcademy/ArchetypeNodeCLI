import { environment } from "../env/env.adapter.ts";
import {
	LOG_LEVELS,
	type LogLevel,
	type LogLevelName,
} from "./log-level.type.ts";
import {
	DEFAULT_REPOSITORIES,
	type LogRepository,
	type LogRepositoryName,
} from "./log-repository.type.ts";

let logRepositories: LogRepository[] | undefined = undefined;

export function getLogRepositories(): LogRepository[] {
	if (logRepositories) {
		return logRepositories;
	}
	logRepositories = getFromEnvironment() ?? DEFAULT_REPOSITORIES;
	return logRepositories;
}

function getFromEnvironment(): LogRepository[] | undefined {
	const envRepositoriesNames = environment.getEntry("LOG_REPOSITORIES");
	if (
		envRepositoriesNames &&
		Array.isArray(envRepositoriesNames) &&
		envRepositoriesNames.length > 0
	) {
		const logRepositories = envRepositoriesNames.map((repositoryName) => ({
			name: repositoryName as LogRepositoryName,
			minLevel: getMinLevelBy(repositoryName),
		}));
		return logRepositories;
	}
	return undefined;
}

function getMinLevelBy(repositoryName: string): LogLevel {
	const envRepositoryMinLevel = environment.getEntry(
		`LOG_${repositoryName.toUpperCase()}_MIN_LEVEL`,
	);
	if (envRepositoryMinLevel) {
		const minLevel = LOG_LEVELS[envRepositoryMinLevel as LogLevelName];
		if (minLevel) {
			return minLevel;
		}
	}
	return LOG_LEVELS.info;
}
