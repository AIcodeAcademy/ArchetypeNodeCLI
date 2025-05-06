import { getLogRepositories } from "./log-config.utils.ts";
import type { LogEntry } from "./log-entry.type.ts";
import { LOG_LEVELS, type LogLevelName } from "./log-level.type.ts";
import { getLogRepositoryWriter } from "./log-repository.type.ts";

export const log = {
	debug(message: string, context?: Record<string, unknown>, source?: string) {
		const entry = buildLogEntry("debug", message, context, source);
		write(entry);
	},
	info(message: string, context?: Record<string, unknown>, source?: string) {
		const entry = buildLogEntry("info", message, context, source);
		write(entry);
	},
	warn(message: string, context?: Record<string, unknown>, source?: string) {
		const entry = buildLogEntry("warn", message, context, source);
		write(entry);
	},
	error(message: string, context?: Record<string, unknown>, source?: string) {
		const entry = buildLogEntry("error", message, context, source);
		write(entry);
	},
};

function buildLogEntry(
	levelName: LogLevelName,
	message: string,
	context?: Record<string, unknown>,
	source?: string,
): LogEntry {
	const level = LOG_LEVELS[levelName];
	return {
		level,
		message,
		source: source ?? "log",
		context,
		timestamp: Date.now(),
	};
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
