import { cache } from "../../../shared/cache/cache.service.ts";
import { log } from "../../../shared/log/log.service.ts";
import { ipApiRepository } from "../system/ip-api.repository.ts";
import type { IpApi } from "../system/ip-api.type.ts";

const CACHE_KEY = "ip-api";

export async function getCurrentIpFromCache() {
	const cachedIp = await cache.get<IpApi>(CACHE_KEY);
	if (cachedIp) {
		log.warn(`ip from cache: ${cachedIp.query}`, cachedIp);
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
	log.warn(`ip from api: ${response.value.query}`, response.value);
	return response.value;
}
