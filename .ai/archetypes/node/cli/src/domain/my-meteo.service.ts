import { ipRepository } from "../system/ip.repository.ts";
import { meteoRepository } from "../system/meteo.repository.ts";
import { mapToMyMeteo } from "./my-meteo.mapper.ts";
import type { MyMeteo } from "./my-meteo.type.ts";

export async function getMyMeteo(): Promise<MyMeteo> {
	const ipInfo = await ipRepository.getIpInfo();
	if (ipInfo.status !== "success") {
		throw new Error("Failed to get IP info");
	}
	const meteo = await meteoRepository.getMeteo(ipInfo.lat, ipInfo.lon);
	const myMeteo = mapToMyMeteo(ipInfo, meteo);
	return myMeteo;
}
