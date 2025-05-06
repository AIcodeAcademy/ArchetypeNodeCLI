import { file } from "../file/file.adapter.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogRepositoryWriteEntry } from "./log-repository.type.ts";

export const logFileRepository: LogRepositoryWriteEntry = {
	write(entry: LogEntry) {
		const fileMessage = buildFileMessage(entry);
		file.appendLine(LOG_FILE_PATH, fileMessage);
		if (entry.context) {
			const contextMessage = buildContextMessage(entry.context);
			file.appendLine(LOG_FILE_PATH, contextMessage);
		}
	},
};

const LOG_FILE_PATH = "./temp/log.csv";

function buildFileMessage(entry: LogEntry): string {
	const time = new Date(entry.timestamp).toLocaleTimeString();
	return `${time},${entry.level.name},${entry.message}`;
}

function buildContextMessage(context: unknown): string {
	if (typeof context === "string") {
		return context;
	}
	if (context instanceof Error) {
		return context.cause?.toString() || context.stack || context.message;
	}
	if (typeof context === "object") {
		return Object.entries(context as Record<string, unknown>)
			.map(([key, value]) => `${key}=${value}`)
			.join(",");
	}
	return JSON.stringify(context);
}
