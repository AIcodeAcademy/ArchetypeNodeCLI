import { type MyMeteoOptions, getMyMeteo } from "../domain/my-meteo.service.ts";
import { getLog } from "../system/log/log.utils.ts";

export async function runMyMeteoCommand(options: MyMeteoOptions) {
	try {
		const meteo = await getMyMeteo(options);
		getLog().info("My meteorological data", meteo);
	} catch (error) {
		getLog().error("Error getting my meteorological data", error);
	}
}
