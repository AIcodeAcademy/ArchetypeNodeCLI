import { http } from "./http/http.adapter.ts";
import type { OpenMeteo } from "./meteo.type.ts";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const openMeteoRepository = {
	async getMeteo(latitude: number, longitude: number): Promise<OpenMeteo> {
		const response = await http.get<OpenMeteo>(
			`${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
		);
		return response.data;
	},
};
