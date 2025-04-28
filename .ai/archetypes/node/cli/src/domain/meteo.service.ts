import type { IpInfo } from "../system/ip-info.type.ts";
import { ipRepository } from "../system/ip.repository.ts";
import { getLog } from "../system/log/log.utils.ts";
import { openMeteoRepository } from "../system/open-meteo.repository.ts";
import { cache } from "./cache.utils.ts";
import { mapToMeteo } from "./meteo.mapper.ts";
import type { Meteo } from "./meteo.type.ts";

export type MeteoOptions = {
	useCache: boolean;
};

export async function getMeteo(options: MeteoOptions): Promise<Meteo> {
	let ipInfo: IpInfo;
	if (options.useCache) {
		ipInfo = await getIpFromCache();
	} else {
		ipInfo = await ipRepository.getIpInfo();
	}
	const openMeteo = await openMeteoRepository.getMeteo(ipInfo.lat, ipInfo.lon);
	const meteo = mapToMeteo(ipInfo, openMeteo);
	return meteo;
}

async function getIpFromCache(): Promise<IpInfo> {
	const cachedIpInfo = await cache.load<IpInfo>("ipInfo");
	if (cachedIpInfo) {
		return cachedIpInfo;
	}
	const ipInfo = await ipRepository.getIpInfo();
	getLog().warn("Saving IP info to cache", ipInfo);
	await cache.save("ipInfo", ipInfo);
	return ipInfo;
}
