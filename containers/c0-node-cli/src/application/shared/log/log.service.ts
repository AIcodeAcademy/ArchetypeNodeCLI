import { getLogRepositories } from "./log-config.utils.ts";
import type { LogEntry } from "./log-entry.type.ts";
import { LOG_LEVELS, type LogLevelName } from "./log-level.type.ts";
import { getLogRepositoryWriter } from "./log-repository.type.ts";

export const log = {
	debug(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("debug", message, context);
		write(entry);
	},
	info(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("info", message, context);
		write(entry);
	},
	warn(message: string, context?: Record<string, unknown>) {
		const entry = buildLogEntry("warn", message, context);
		write(entry);
	},
	error(error: Error, context?: Record<string, unknown>) {
		const message = error.message;
		const errorContext = {
			stack: error.stack,
			cause: error.cause,
		};
		context && Object.assign(errorContext, context);
		const entry = buildLogEntry("error", message, errorContext);
		write(entry);
	},
};

function buildLogEntry(
	levelName: LogLevelName,
	message: string,
	context?: Record<string, unknown>,
): LogEntry {
	const level = LOG_LEVELS[levelName];
	const source = getSource(levelName);
	const timestamp = Date.now();
	return {
		level,
		message,
		source,
		context,
		timestamp,
	};
}

function getSource(levelName: LogLevelName): string | undefined {
	if (["debug", "error"].includes(levelName)) {
		const source = new Error().stack?.split("\n")[4].trim();
		return source ?? "log";
	}
	return undefined;
}

function write(entry: LogEntry) {
	// for (const repository of getLogRepositories()) {
	// 	if (entry.level.rank >= repository.minLevel.rank) {
	// 		const repositoryWriter = getLogRepositoryWriter(repository.name);
	// 		if (!repositoryWriter) {
	// 			continue;
	// 		}
	// 		repositoryWriter.write(entry);
	// 	}
	// }

	// biome-ignore lint/complexity/noForEach: pipeline
	getLogRepositories()
		.filter((repository) => entry.level.rank >= repository.minLevel.rank)
		.map((repository) => getLogRepositoryWriter(repository.name))
		.filter((repositoryWriter) => !!repositoryWriter)
		.forEach((repositoryWriter) => repositoryWriter.write(entry));
}
