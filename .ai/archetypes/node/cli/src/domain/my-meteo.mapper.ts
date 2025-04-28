import type { IpInfo } from "../system/ip-info.type.ts";
import type { Meteo } from "../system/meteo.type.ts";
import type { DailyForecast, MyMeteo } from "./my-meteo.type.ts";

export function mapToMyMeteo(ipInfo: IpInfo, meteo: Meteo): MyMeteo {
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
