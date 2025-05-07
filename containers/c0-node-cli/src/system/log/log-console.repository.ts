import type { LogEntry } from "./log-entry.type.ts";
import type { LogRepositoryWriteEntry } from "./log-repository.type.ts";
import { styleTextAdapter } from "./style-text.adapter.ts";

export const logConsoleRepository: LogRepositoryWriteEntry = {
	write(entry: LogEntry) {
		const consoleMessage = buildConsoleMessage(entry);
		console.log(
			styleTextAdapter.styleText(
				[entry.level.color],
				[entry.level.style],
				consoleMessage,
			),
		);
		if (entry.context) {
			const contextMessage = buildContextMessage(entry.context);
			console.log(
				styleTextAdapter.styleText(
					[entry.level.color],
					[],
					`-> ${contextMessage}`,
				),
			);
		}
	},
};

function buildConsoleMessage(entry: LogEntry): string {
	const time = new Date(entry.timestamp).toLocaleTimeString();
	return `${time} ${entry.level.name.padEnd(5)} ${entry.message} ${entry.source || ""}`;
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
