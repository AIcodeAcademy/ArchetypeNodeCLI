import { cache } from "../../../shared/cache/cache.service.ts";
import { ipApiRepository } from "../system/ip-api.repository.ts";
import type { IpApi } from "../system/ip-api.type.ts";

const CACHE_KEY = "ip-api";

export async function getCurrentIpFromCache() {
	const cachedIp = await cache.get<IpApi>(CACHE_KEY);
	if (cachedIp) {
		return cachedIp;
	}
	const ip = await getCurrentIpFromApi();
	cache.set(CACHE_KEY, ip);
	return ip;
}

export async function getCurrentIpFromApi(): Promise<IpApi> {
	const response = await ipApiRepository.getIpApi();
	if (response.error instanceof Error) {
		throw response.error;
	}
	return response.value;
}
