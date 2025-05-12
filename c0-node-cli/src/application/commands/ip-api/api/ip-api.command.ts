import type { CommandHandler } from "../../../shared/cli/command-handler.interface.ts";
import { log } from "../../../shared/log/log.service.ts";
import { ipApiService } from "../domain/ip-api.service.ts";
import type { IpApi } from "../system/ip-api.type.ts";
import type { IpApiOptions } from "./ip-api-options.type.ts";

/**
 * IP API command implementation.
 * Retrieves IP information either from cache or directly from the API.
 */
export const ipApiCommand: CommandHandler<IpApiOptions> = {
	/** Command parsing options for IP API command */
	parseOptions: {
		useCache: { type: "boolean", default: false },
	},
	/**
	 * Executes the IP API command with the provided options.
	 * @async
	 * @param {IpApiOptions} ipApiOptions - Options for IP API command
	 * @returns {Promise<void>}
	 */
	async run(ipApiOptions: IpApiOptions): Promise<void> {
		log.info("ipApiCommand.run", ipApiOptions);
		let ipApi: IpApi;
		if (ipApiOptions.useCache) {
			ipApi = await ipApiService.getFromCache();
		} else {
			ipApi = await ipApiService.getFromApi();
		}
		log.info("ipApiCommand.run", ipApi);
	},
};
