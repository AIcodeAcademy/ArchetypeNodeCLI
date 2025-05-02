export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type HttpRequest = {
	url: string;
	body?: unknown;
	method?: HttpMethod;
};
