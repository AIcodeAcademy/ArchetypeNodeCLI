import { type MeteoOptions, getMeteo } from "../domain/meteo.service.ts";
import { getLog } from "../system/log/log.utils.ts";

export async function runMeteoCommand(options: MeteoOptions) {
	try {
		const meteo = await getMeteo(options);
		getLog().info("My meteorological data", meteo);
	} catch (error) {
		getLog().error("Error getting my meteorological data", error);
	}
}
