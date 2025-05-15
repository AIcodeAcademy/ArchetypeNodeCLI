import { environment } from "../env/env.adapter.ts";
import { logConsoleRepository } from "./log-console.repository.ts";
import { logFileRepository } from "./log-file.repository.ts";
import {
	LOG_LEVELS,
	type LogLevel,
	type LogLevelName,
} from "./log-level.type.ts";
import {
	DEFAULT_REPOSITORIES,
	type LogRepository,
	type LogRepositoryName,
	type LogRepositoryWriteEntry,
} from "./log-repository.type.ts";

const logRepositoriesWritersMap: Record<
	LogRepositoryName,
	LogRepositoryWriteEntry
> = {
	console: logConsoleRepository,
	file: logFileRepository,
};

let logRepositories: LogRepository[] | undefined = undefined;

export const logRepositoryFactory = {
	init() {
		logRepositories = getFromEnvironment() ?? DEFAULT_REPOSITORIES;
		return logRepositories;
	},

	createForLevel(minLevel: LogLevel) {
		const repositories = logRepositories || this.init();
		return repositories
			.filter(
				(repository: LogRepository) =>
					repository.minLevel.rank <= minLevel.rank,
			)
			.map((repository: LogRepository) =>
				getLogRepositoryWriter(repository.name),
			)
			.filter((writer: LogRepositoryWriteEntry | undefined) => !!writer);
	},
};

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
	console.warn("No log repositories found in environment");
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

export function getLogRepositoryWriter(
	name: LogRepositoryName,
): LogRepositoryWriteEntry | undefined {
	return logRepositoriesWritersMap[name];
}
