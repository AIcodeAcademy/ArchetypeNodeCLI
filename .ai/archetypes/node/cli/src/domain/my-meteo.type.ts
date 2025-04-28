export type MyMeteo = {
	country: string;
	region: string;
	city: string;
	timezone: string;
	latitude: number;
	longitude: number;
	dailyForecasts: DailyForecast[];
};

export type DailyForecast = {
	date: string;
	max_temperature: number;
	min_temperature: number;
};
