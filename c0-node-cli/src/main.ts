import { application } from "./app/app.bootstrap.ts";

/**
 * Main entry point for the CLI application.
 * Initializes the application and handles any initialization errors.
 */
async function main() {
	try {
		await application.init();
		await application.processCommandLine();
	} catch (error) {
		console.error(error);
	}
}

main();
