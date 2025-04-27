import { ConsoleTransport } from "./console-transport.repository.ts";
import { FileTransport } from "./file-transport.repository.ts";
import type {
	LogTransport,
	LogTransportConfig,
	LogTransportType,
} from "./log.type.ts";

type TransportConstructor = (transport: LogTransportConfig) => LogTransport;

const transportConstructors: Record<LogTransportType, TransportConstructor> = {
	console: (transport) => new ConsoleTransport(transport),
	file: (transport) => new FileTransport(transport),
	http: () => {
		throw new Error("HTTP transport not implemented");
	},
};

export function transportFactory(transport: LogTransportConfig): LogTransport {
	const ctor = transportConstructors[transport.type];
	if (!ctor) {
		throw new Error(`Unknown transport type: ${transport.type}`);
	}
	return ctor(transport);
}
