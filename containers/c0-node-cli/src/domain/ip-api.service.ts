import { cache } from "../system/cache/cache.service.ts";
import { ipApiRepository } from "../system/ip-api/ip-api.repository.ts";
import type { IpApi } from "../system/ip-api/ip-api.type.ts";

export type IpApiOptions = {
	useCache: boolean;
};

const CACHE_KEY = "ip-api";

export async function getCurrentIp(ipApiOptions: IpApiOptions): Promise<IpApi> {
	if (ipApiOptions.useCache) {
		return getCurrentIpFromCache(ipApiOptions);
	}
	return getCurrentIpFromApi();
}

async function getCurrentIpFromCache(ipApiOptions: IpApiOptions) {
	const cachedIp = await cache.get<IpApi>(CACHE_KEY);
	if (cachedIp) {
		return cachedIp;
	}
	const ip = await getCurrentIpFromApi();
	cache.set(CACHE_KEY, ip);
	return ip;
}

async function getCurrentIpFromApi(): Promise<IpApi> {
	const response = await ipApiRepository.getIpApi();
	if (response.ok) {
		return response.data;
	}
	throw new Error(response.errorMessage, { cause: response.error });
}
