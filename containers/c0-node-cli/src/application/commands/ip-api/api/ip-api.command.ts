import type { CommandHandler } from "../../../shared/cli/command-handler.interface.ts";
import { log } from "../../../shared/log/log.service.ts";
import {
	getCurrentIpFromApi,
	getCurrentIpFromCache,
} from "../domain/ip-api.service.ts";
import type { IpApi } from "../system/ip-api.type.ts";
import type { IpApiOptions } from "./ip-api-options.type.ts";

export const ipApiCommand: CommandHandler<IpApiOptions> = {
	parseOptions: {
		useCache: { type: "boolean", default: false },
	},
	async run(ipApiOptions: IpApiOptions) {
		log.info("ipApiCommand.run", ipApiOptions);
		let ipApi: IpApi;
		if (ipApiOptions.useCache) {
			ipApi = await getCurrentIpFromCache();
		} else {
			ipApi = await getCurrentIpFromApi();
		}
		log.info("ipApiCommand.run", ipApi);
	},
};
