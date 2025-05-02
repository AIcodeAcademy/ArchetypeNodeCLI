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
	get: async <T>(url: string) => httpDecorator.wrap<T>(fetch, { url }),

	post: async <T>(url: string, body: unknown) =>
		httpDecorator.wrap<T>(fetch, { url, body }),

	put: async <T>(url: string, body: unknown) =>
		httpDecorator.wrap<T>(fetch, { url, body, method: "PUT" }),

	delete: async <T>(url: string) =>
		httpDecorator.wrap<T>(fetch, { url, method: "DELETE" }),
};
