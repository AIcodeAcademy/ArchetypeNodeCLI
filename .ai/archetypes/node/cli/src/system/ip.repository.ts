import { http } from "./http/http.adapter.ts";
import type { IpInfo } from "./ip-info.type.ts";

const IP_API_URL = "http://ip-api.com/json";

export const ipRepository = {
	async getIpInfo(): Promise<IpInfo> {
		const response = await http.get<IpInfo>(IP_API_URL);
		if (response.data.status !== "success") {
			throw new Error("Failed to get IP info");
		}
		return response.data;
	},
};
