import { http } from "./http/http.adapter.ts";
import type { IpApi } from "./ip-api.type.ts";

const IP_API_URL = "http://ip-api.com/json";

export const ipApiRepository = {
	async getIpApi(): Promise<IpApi> {
		const response = await http.get<IpApi>(IP_API_URL);
		if (response.data.status !== "success") {
			throw new Error("Failed to get IP info");
		}
		return response.data;
	},
};
