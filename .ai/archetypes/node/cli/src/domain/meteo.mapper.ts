import type { IpInfo } from "../system/ip-info.type.ts";
import type { OpenMeteo } from "../system/meteo.type.ts";
import type { DailyForecast, Meteo } from "./meteo.type.ts";

export function mapToMeteo(ipInfo: IpInfo, meteo: OpenMeteo): Meteo {
	const dailyForecasts: DailyForecast[] = meteo.daily.time.map(
		(time, index) => ({
			date: time,
			max_temp: meteo.daily.temperature_2m_max[index],
			min_temp: meteo.daily.temperature_2m_min[index],
		}),
	);
	return {
		country: ipInfo.country,
		city: ipInfo.city,
		timezone: meteo.timezone,
		latitude: meteo.latitude,
		longitude: meteo.longitude,
		dailyForecasts,
	};
}
