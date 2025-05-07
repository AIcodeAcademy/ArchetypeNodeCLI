import { init } from "./application/application.ts";

async function main() {
	try {
		await init();
	} catch (error) {
		console.error(error);
	}
}

main();
