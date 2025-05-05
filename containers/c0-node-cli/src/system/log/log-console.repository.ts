import type { LogEntry } from "./log-entry.type.ts";
import type { LogRepositoryWriteEntry } from "./log-write.interface.ts";

export const logConsoleRepository: LogRepositoryWriteEntry = {
	write(entry: LogEntry) {
		const consoleMessage = buildConsoleMessage(entry);
		console.log(consoleMessage);
		if (entry.context) {
			const contextMessage = buildContextMessage(entry.context);
			console.log(contextMessage);
		}
	},
};

function buildConsoleMessage(entry: LogEntry): string {
	const time = new Date(entry.timestamp).toLocaleTimeString();
	return `${time} ${entry.level.padEnd(5)} ${entry.message}`;
}

function buildContextMessage(context: Record<string, unknown>): string {
	return Object.entries(context)
		.map(([key, value]) => `${key}=${value}`)
		.join(",");
}
