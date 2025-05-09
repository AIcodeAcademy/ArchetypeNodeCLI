import { application } from "./application/application.ts";

async function main() {
	try {
		await application.init();
	} catch (error) {
		console.error(error);
	}
}

main();
