import type { MeteoOptions } from "../domain/meteo.service.ts";
import { meteoService } from "../domain/meteo.service.ts";
import { logService } from "../system/log/log.service.ts";

export async function runMeteoCommand(options: MeteoOptions) {
	try {
		const meteo = await meteoService.getMeteo(options);
		logService.log().info("My meteorological data", meteo);
	} catch (error) {
		logService.log().error("Error getting my meteorological data", error);
	}
}
