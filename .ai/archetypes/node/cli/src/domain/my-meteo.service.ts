import type { IpInfo } from "../system/ip-info.type.ts";
import { ipRepository } from "../system/ip.repository.ts";
import { getLog } from "../system/log/log.utils.ts";
import { meteoRepository } from "../system/meteo.repository.ts";
import { cache } from "./cache.utils.ts";
import { mapToMyMeteo } from "./my-meteo.mapper.ts";
import type { MyMeteo } from "./my-meteo.type.ts";

export type MyMeteoOptions = {
	useCache: boolean;
};

export async function getMyMeteo(options: MyMeteoOptions): Promise<MyMeteo> {
	let ipInfo: IpInfo;
	if (options.useCache) {
		ipInfo = await getMyIpFromCache();
	} else {
		ipInfo = await ipRepository.getIpInfo();
	}
	const meteo = await meteoRepository.getMeteo(ipInfo.lat, ipInfo.lon);
	const myMeteo = mapToMyMeteo(ipInfo, meteo);
	return myMeteo;
}

async function getMyIpFromCache(): Promise<IpInfo> {
	const cachedIpInfo = await cache.load<IpInfo>("ipInfo");
	if (cachedIpInfo) {
		return cachedIpInfo;
	}
	const ipInfo = await ipRepository.getIpInfo();
	getLog().warn("Saving IP info to cache", ipInfo);
	await cache.save("ipInfo", ipInfo);
	return ipInfo;
}
