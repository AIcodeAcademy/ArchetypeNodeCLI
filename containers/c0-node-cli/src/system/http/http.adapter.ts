import { httpDecorator } from "./http.decorator.ts";

// ToDo: add config

let httpConfig: unknown;

export const http = {
	get: async <T>(url: string) => httpDecorator<T>(fetch, { url }),

	post: async <T>(url: string, body: unknown) =>
		httpDecorator<T>(fetch, { url, body }),

	put: async <T>(url: string, body: unknown) =>
		httpDecorator<T>(fetch, { url, body, method: "PUT" }),

	delete: async <T>(url: string) =>
		httpDecorator<T>(fetch, { url, method: "DELETE" }),
};
