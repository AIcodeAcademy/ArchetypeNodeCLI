import type { CommandHandler } from "../../../shared/cli/command-handler.interface.ts";
import { log } from "../../../shared/log/log.service.ts";
import {
	getCurrentIpFromApi,
	getCurrentIpFromCache,
} from "../domain/ip-api.service.ts";
import type { IpApiOptions } from "./ip-api-options.type.ts";

export const ipApiCommand: CommandHandler<IpApiOptions> = {
	parseOptions: {
		useCache: { type: "boolean", default: false },
	},
	async run(ipApiOptions: IpApiOptions) {
		log.info("ipApiCommand.run", ipApiOptions);
		if (ipApiOptions.useCache) {
			const ipApi = await getCurrentIpFromCache();
			log.warn(`ip from cache: ${ipApi.query}`, ipApi);
		} else {
			const ipApi = await getCurrentIpFromApi();
			log.warn(`ip from api: ${ipApi.query}`, ipApi);
		}
	},
};
