import { getConfigRepositories } from "./log-config.utils.ts";
import { logConsoleRepository } from "./log-console.repository.ts";
import type { LogEntry, LogLevel } from "./log-entry.type.ts";
import { logFileRepository } from "./log-file.repository.ts";
import type { LogRepository } from "./log-repository.type.ts";
import type { LogRepositoryWriteEntry } from "./log-write.interface.ts";

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

function write(entry: LogEntry) {
	for (const currentRepository of getConfigRepositories()) {
		const repository = logRepositoriesMap[currentRepository.repository];
		if (repository) {
			if (entry.level >= currentRepository.minLevel) {
				repository.write(entry);
			}
		}
	}
}

const logRepositoriesMap: Record<LogRepository, LogRepositoryWriteEntry> = {
	console: logConsoleRepository,
	file: logFileRepository,
};

function buildLogEntry(
	level: LogLevel,
	message: string,
	context?: Record<string, unknown>,
	source?: string,
): LogEntry {
	return {
		level,
		message,
		source: source ?? "log",
		context,
		timestamp: Date.now(),
	};
}
