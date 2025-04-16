import { createSample } from "../domain/sample.service.ts";
import { logError, logInfo } from "../system/log.utils.ts";
import { getArgs, getCommand } from "./cli.utils.ts";

export { processCommand };

async function processCommand(): Promise<unknown> {
	const command = getCommand();
	const args = getArgs();
	logInfo(`Command: ${command}`, command);
	logInfo(`Arguments: ${args}`, args);
	switch (command) {
		case "create":
			return await createSample(args[0]);
		default:
			logError(`Unknown command: ${command}`, command);
			return null;
	}
}
