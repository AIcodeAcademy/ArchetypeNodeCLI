import type { HttpResponse } from "../http/http-response.type.ts";
import { http } from "../http/http.adapter.ts";
import type { IpApi } from "./ip-api.type.ts";

const IP_API_URL = "http://ip-api.com/json";

export const ipApiRepository = {
	async getIpApi(): Promise<HttpResponse<IpApi>> {
		return await http.get<IpApi>(IP_API_URL);
	},
};
