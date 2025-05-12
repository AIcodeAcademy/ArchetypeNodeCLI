import { cache } from "../../../shared/cache/cache.service.ts";
import { log } from "../../../shared/log/log.service.ts";
import { ipApiGateway } from "../system/ip-api.gateway.ts";
import type { IpApi } from "../system/ip-api.type.ts";

export const ipApiService = {
	async getFromCache() {
		const CACHE_KEY = "ip-api";
		const cachedIp = await cache.get<IpApi>(CACHE_KEY);
		if (cachedIp) {
			log.info(`ip from cache: ${cachedIp.query}`, cachedIp);
			return cachedIp;
		}
		const ip = await ipApiService.getFromApi();
		cache.set(CACHE_KEY, ip);
		return ip;
	},

	async getFromApi(): Promise<IpApi> {
		const response = await ipApiGateway.getIpApi();
		if (response.error instanceof Error) {
			throw response.error;
		}
		log.info(`ip from api: ${response.value.query}`, response.value);
		return response.value;
	},
};
