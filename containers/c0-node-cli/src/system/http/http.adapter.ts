import { httpDecorator } from "./http.decorator.ts";

/**
 * HTTP adapter
 *
 * @description Adapts the global Node.js fetch API to a more generic and user-friendly interface
 * @example
 * const response = await http.get("https://api.example.com/data");
 * console.log(response.data);
 */
export const http = {
	get: async <T>(url: string) => {
		return httpDecorator<T>(fetch, url);
	},

	post: async <T>(url: string, data: unknown) => {
		return httpDecorator<T>(fetch, url, data);
	},

	put: async <T>(url: string, data: unknown) => {
		return httpDecorator<T>(fetch, url, data, "PUT");
	},

	delete: async (url: string) => {
		return httpDecorator(fetch, url, undefined, "DELETE");
	},
};
