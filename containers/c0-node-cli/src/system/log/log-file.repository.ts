import { file } from "../file/file.adapter.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogRepositoryWriteEntry } from "./log-write.interface.ts";

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
	return `${time},${entry.level.padEnd(5)},${entry.message}`;
}

function buildContextMessage(context: Record<string, unknown>): string {
	return Object.entries(context)
		.map(([key, value]) => `${key}=${value}`)
		.join(",");
}
