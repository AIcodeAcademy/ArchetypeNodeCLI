export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type HttpRequest = {
	url: string;
	body?: unknown;
	method?: HttpMethod;
	token?: string;
	apiKey?: string;
};

export const DEFAULT_HTTP_REQUEST: HttpRequest = {
	url: "",
	body: undefined,
	method: "GET",
	token: undefined,
	apiKey: undefined,
};
