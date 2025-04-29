import type { IpApi } from "../system/ip-api.type.ts";
import type { OpenMeteo } from "../system/open-meteo.type.ts";
import type { Meteo } from "./meteo.type.ts";

export function mapToMeteo(ipApi: IpApi, openMeteo: OpenMeteo): Meteo {
	const meteo: Meteo = {
		country: ipApi.country,
		city: ipApi.city,
		timezone: openMeteo.timezone,
		latitude: openMeteo.latitude,
		longitude: openMeteo.longitude,
		dailyForecasts: [],
	};
	meteo.dailyForecasts = openMeteo.daily.time.map((time, index) => ({
		date: time,
		max_temp: openMeteo.daily.temperature_2m_max[index],
		min_temp: openMeteo.daily.temperature_2m_min[index],
	}));
	return meteo;
}
