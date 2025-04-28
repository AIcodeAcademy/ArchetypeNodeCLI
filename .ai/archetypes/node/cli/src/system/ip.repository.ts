import { cache } from "../domain/cache.utils.ts";
import { http } from "./http/http.adapter.ts";
import type { IpInfo } from "./ip-info.type.ts";

const IP_API_URL = "http://ip-api.com/json";

export const ipRepository = {
	async getIpInfo(): Promise<IpInfo> {
		const cachedIpInfo = await cache.load<IpInfo>("ipInfo");
		if (cachedIpInfo) {
			return cachedIpInfo;
		}
		const response = await http.get<IpInfo>(IP_API_URL);
		await cache.save("ipInfo", response.data);
		return response.data;
	},
};
