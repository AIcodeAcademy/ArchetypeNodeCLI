import { Log } from "./log.singleton.ts";

export const logService = {
	log: () => Log.getInstance(),
};
