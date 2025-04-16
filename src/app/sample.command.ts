import { createSample } from "../domain/sample.service.ts";
import { logInfo } from "../system/log.utils.ts";
import { getArgs, getCommand } from "./cli.utils.ts";

export { processCommand };

async function processCommand(): Promise<unknown> {
	const command = getCommand();
	const args = getArgs();
	logInfo(`Command: `, command);
	logInfo(`Arguments: `, args);
	switch (command) {
		case "create":
			return await createSample(args[0]);
		default:
			throw new Error(`Unknown command: ${command}`);
	}
}
