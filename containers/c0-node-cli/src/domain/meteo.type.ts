export type Meteo = {
	country: string;
	city: string;
	timezone: string;
	latitude: number;
	longitude: number;
	dailyForecasts: DailyForecast[];
};

export type DailyForecast = {
	date: string;
	max_temp: number;
	min_temp: number;
};
