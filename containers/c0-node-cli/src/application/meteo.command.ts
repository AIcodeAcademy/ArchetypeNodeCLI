import type { MeteoOptions } from "../domain/meteo.service.ts";
import { meteoService } from "../domain/meteo.service.ts";
import { log } from "../system/log/log.singleton.ts";

export const meteoCommand = {
	run: async (options: MeteoOptions) => {
		try {
			const meteo = await meteoService.getMeteo(options);
			log.info("My meteorological data", meteo);
		} catch (error) {
			log.error("Error getting my meteorological data", error);
		}
	},
};
