import { parseCommands } from "./application/args.utils.ts";
import { readConfig } from "./system/config/config.repository.ts";
import { getEnv } from "./system/env/env.utils.ts";
import { http } from "./system/http.utils.ts";
import { LogService } from "./system/log/log.service.ts";

const env = getEnv();
const config = await readConfig(env.CONFIG_FILE);
const log = LogService.getInstance(config.log);

log.debug("A message to help you while debugging", getEnv());
log.info("A message of any normal operation", getEnv());
log.warn("A message of an important event", getEnv());
log.error("A message of an exceptional event", getEnv());

parseCommands();

const response = await http.get("http://localhost:3000/api/activities");
if (response.ok) {
	log.info("response", response.data);
} else {
	log.error("response", response.error);
}

const response2 = await http.get("http://localhost:3000/api/activities/123");
if (response2.ok) {
	log.info("response2", response2.data);
} else {
	log.error("response2", response2.error);
}

const response3 = await http.post("http://localhost:3000/api/activities", {
	name: "John Doe",
	email: "john.doe@example.com",
});
if (response3.ok) {
	log.info("response3", response3.data);
} else {
	log.error("response3", response3.error);
}
