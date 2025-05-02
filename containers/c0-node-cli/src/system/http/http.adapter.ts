import { httpDecorator } from "./http.decorator.ts";

/**
 * HTTP adapter (shorthand http)
 * @module http.adapter
 * @description Adapts the global Node.js fetch API to a more generic and user-friendly interface
 * @example
 * const response = await http.get("https://api.example.com/data");
 * console.log(response.data);
 */
export const http = {
	get: async <T>(url: string) => httpDecorator.wrap<T>(fetch, url),

	post: async <T>(url: string, data: unknown) =>
		httpDecorator.wrap<T>(fetch, url, data),

	put: async <T>(url: string, data: unknown) =>
		httpDecorator.wrap<T>(fetch, url, data, "PUT"),

	delete: async <T>(url: string) =>
		httpDecorator.wrap<T>(fetch, url, undefined, "DELETE"),
};
