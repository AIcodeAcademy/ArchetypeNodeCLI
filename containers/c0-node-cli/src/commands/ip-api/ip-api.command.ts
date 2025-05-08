import type { CommandHandler } from "../../shared/cli/command-handler.interface.ts";
import { log } from "../../shared/log/log.service.ts";
import { type IpApiOptions, getCurrentIp } from "./ip-api.service.ts";

export const ipApiCommand: CommandHandler = {
	async run(ipApiOptions: IpApiOptions) {
		log.info("ipApiCommand.run", ipApiOptions);
		const ipApi = await getCurrentIp(ipApiOptions);
		log.warn(`ip ${ipApi.query}`, ipApi);
	},
};
