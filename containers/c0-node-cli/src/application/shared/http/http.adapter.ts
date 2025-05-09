import { fetchDecorator } from "./fetch.decorator.ts";

// ToDo: add config

let httpConfig: unknown;

export const http = {
	get: async <T>(url: string) => fetchDecorator.wrap<T>(fetch, { url }),

	post: async <T>(url: string, body: unknown) =>
		fetchDecorator.wrap<T>(fetch, { url, body }),

	put: async <T>(url: string, body: unknown) =>
		fetchDecorator.wrap<T>(fetch, { url, body, method: "PUT" }),

	delete: async <T>(url: string) =>
		fetchDecorator.wrap<T>(fetch, { url, method: "DELETE" }),
};
