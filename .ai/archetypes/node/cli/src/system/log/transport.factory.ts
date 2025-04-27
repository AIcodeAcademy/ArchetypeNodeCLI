import type {
	LogTransport,
	LogTransportConfig,
	LogTransportType,
} from "./log.type.ts";
import { TransportConsole } from "./transport-console.repository.ts";
import { TransportFile } from "./transport.-file.repository.ts";

type TransportConstructor = (transport: LogTransportConfig) => LogTransport;

const transportConstructorsMap: Record<LogTransportType, TransportConstructor> =
	{
		console: (transport) => new TransportConsole(transport),
		file: (transport) => new TransportFile(transport),
		http: () => {
			throw new Error("HTTP transport not implemented");
		},
	};

export function transportFactory(
	transport: LogTransportConfig,
): LogTransport | undefined {
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
