import { createSample } from "../domain/sample.service.ts";
import { getArgs, getCommand } from "./cli.utils.ts";

export { processCommand };

async function processCommand(): Promise<unknown> {
	const command = getCommand();
	const args = getArgs();
	switch (command) {
		case "create":
			return await createSample(args[0]);
		default:
			console.log("Unknown or not yet implemented command");
	}
}
