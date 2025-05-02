import type {
	LogTransportConfig,
	LogTransportType,
} from "./log-config.type.ts";
import { TransportConsoleRepository } from "./transport-console.repository.ts";
import type { TransportWrite } from "./transport-write.interface.ts";
import { TransportFileRepository } from "./transport.-file.repository.ts";

type TransportConstructor = (transport: LogTransportConfig) => TransportWrite;

export const transportFactory = {
	create(transport: LogTransportConfig): TransportWrite | undefined {
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
	},
};

const transportConstructorsMap = {
	console: (transport) => new TransportConsoleRepository(transport),
	file: (transport) => new TransportFileRepository(transport),
	http: () => {
		throw new Error("HTTP transport not implemented");
	},
} as Record<LogTransportType, TransportConstructor>;
