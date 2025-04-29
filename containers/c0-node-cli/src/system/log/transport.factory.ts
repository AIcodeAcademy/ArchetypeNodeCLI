import type {
	LogTransportConfig,
	LogTransportType,
} from "./log-config.type.ts";
import type { LogEntry } from "./log-entry.type.ts";
import { TransportConsole } from "./transport-console.repository.ts";
import { TransportFile } from "./transport.-file.repository.ts";

export interface LogTransportWrite {
	write: (logEntry: LogEntry) => void;
}

export function transportFactory(
	transport: LogTransportConfig,
): LogTransportWrite | undefined {
	try {
		const ctor = transportConstructorsMap[transport.type];
		if (!ctor) {
			console.warn?.(`Unknown transport type: ${transport.type}, skipping.`);
			return undefined;
		}
		return ctor(transport);
	} catch (err) {
		console.warn?.(
			`Failed to initialize transport "${transport.type}": ${err}`,
		);
		return undefined;
	}
}

type TransportConstructor = (
	transport: LogTransportConfig,
) => LogTransportWrite;

const transportConstructorsMap: Record<LogTransportType, TransportConstructor> =
	{
		console: (transport) => new TransportConsole(transport),
		file: (transport) => new TransportFile(transport),
		http: () => {
			throw new Error("HTTP transport not implemented");
		},
	};
