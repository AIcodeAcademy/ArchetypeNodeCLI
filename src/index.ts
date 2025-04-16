/**
 * ArchetypeNodeCLI main entry point
 */
import { processCommand } from "./app/sample.command.ts";
import { logError, logWarn } from "./system/log.utils.ts";

processCommand()
	.then((res) => {
		logWarn("Command processed successfully.", res);
	})
	.catch((error) => {
		logError("Error processing command. ", error);
	});
