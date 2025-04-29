import { http } from "./http/http.adapter.ts";
import type { OpenMeteo } from "./open-meteo.type.ts";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export const openMeteoRepository = {
	async getOpenMeteo(latitude: number, longitude: number): Promise<OpenMeteo> {
		const MEASURES = "temperature_2m_max,temperature_2m_min";
		const response = await http.get<OpenMeteo>(
			`${OPEN_METEO_URL}?latitude=${latitude}&longitude=${longitude}&daily=${MEASURES}&timezone=auto`,
		);
		return response.data;
	},
};
