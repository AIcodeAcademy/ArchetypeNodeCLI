import { ipApiRepository } from "../system/ip-api.repository.ts";
import type { IpApi } from "../system/ip-api.type.ts";
import { getLog } from "../system/log/log.utils.ts";
import { openMeteoRepository } from "../system/open-meteo.repository.ts";
import { cache } from "./cache.utils.ts";
import { mapToMeteo } from "./meteo.mapper.ts";
import type { Meteo } from "./meteo.type.ts";

export type MeteoOptions = {
	useCache: boolean;
};

export async function getMeteo(options: MeteoOptions): Promise<Meteo> {
	let ipApi: IpApi;
	if (options.useCache) {
		ipApi = await getIpApiFromCache();
	} else {
		ipApi = await ipApiRepository.getIpApi();
	}
	const openMeteo = await openMeteoRepository.getOpenMeteo(
		ipApi.lat,
		ipApi.lon,
	);
	const meteo = mapToMeteo(ipApi, openMeteo);
	return meteo;
}

async function getIpApiFromCache(): Promise<IpApi> {
	const CACHE_KEY = "ipApi";
	const cachedIpApi = await cache.load<IpApi>(CACHE_KEY);
	if (cachedIpApi) {
		return cachedIpApi;
	}
	const ipApi = await ipApiRepository.getIpApi();
	getLog().warn("Saving IP info to cache", ipApi);
	await cache.save(CACHE_KEY, ipApi);
	return ipApi;
}
