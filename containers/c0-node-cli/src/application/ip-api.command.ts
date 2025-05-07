import {
	type IpApiOptions,
	getCurrentIp,
} from "../domain/ip-api/ip-api.service.ts";
import { log } from "../system/log/log.service.ts";

export const ipApiCommand = {
	async run(ipApiOptions: IpApiOptions) {
		log.info("ipApiCommand.run", ipApiOptions);
		const ipApi = await getCurrentIp(ipApiOptions);
		log.warn(`ip ${ipApi.query}`, ipApi);
	},
};
