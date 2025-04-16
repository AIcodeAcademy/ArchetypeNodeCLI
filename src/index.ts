/**
 * ArchetypeNodeCLI main entry point
 */
import { processCommand } from "./app/sample.command.ts";
import { logMessage } from "./system/log.utils.ts";

processCommand()
	.then((res) => {
		logMessage("INFO", "Command processed successfully.", res);
	})
	.catch((error) => {
		logMessage("ERROR", "Error processing command: ", error);
	});
