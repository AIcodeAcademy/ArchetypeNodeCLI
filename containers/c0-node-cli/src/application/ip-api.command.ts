import { type IpApiOptions, getCurrentIp } from "../domain/ip-api.service.ts";
import { log } from "../system/log/log.service.ts";

export const ipApiCommand = {
	async run(ipApiOptions: IpApiOptions) {
		const ip = await getCurrentIp(ipApiOptions);
		log.warn("ip", ip);
	},
};
