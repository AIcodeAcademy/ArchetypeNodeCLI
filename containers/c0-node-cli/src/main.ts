import { application } from "./application/application.ts";

/**
 * Main entry point for the CLI application.
 * Initializes the application and handles any initialization errors.
 */
async function main() {
	try {
		await application.init();
	} catch (error) {
		console.error(error);
	}
}

main();
