import { file } from "../file/file.adapter.ts";
import type { LogEntry } from "./log-entry.type.ts";
import type { LogRepositoryWriteEntry } from "./log-repository.type.ts";

export const logFileRepository: LogRepositoryWriteEntry = {
	write(entry: LogEntry) {
		const fileMessage = buildFileMessage(entry);
		file.appendLine(LOG_FILE_PATH, fileMessage);
		if (entry.context) {
			const errorPath = `${LOG_FOLDER_PATH}/${entry.timestamp}.${entry.level.name}.json`;
			file.writeJson(errorPath, entry);
		}
	},
};

const LOG_FOLDER_PATH = "./temp";
const LOG_FILE_PATH = `${LOG_FOLDER_PATH}/log.csv`;

function buildFileMessage(entry: LogEntry): string {
	const time = new Date(entry.timestamp).toLocaleTimeString();
	return `${time},${entry.level.name.padEnd(5)},${entry.message}`;
}
