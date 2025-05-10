import { fetchDecorator } from "./fetch.decorator.ts";

// ToDo: add config

let httpConfig: unknown;

/**
 * HTTP adapter for HTTP requests.
 */
export const http = {
	/**
	 * Gets a resource from the server.
	 * @param url - The URL of the resource to get.
	 * @returns The resource from the server.
	 */
	get: async <T>(url: string) => fetchDecorator.wrap<T>(fetch, { url }),

	/**
	 * Posts a resource to the server.
	 * @param url - The URL of the resource to post.
	 * @param body - The body of the resource to post.
	 * @returns The resource from the server.
	 */
	post: async <T>(url: string, body: unknown) =>
		fetchDecorator.wrap<T>(fetch, { url, body }),

	/**
	 * Puts a resource to the server.
	 * @param url - The URL of the resource to put.
	 * @param body - The body of the resource to put.
	 * @returns The resource from the server.
	 */
	put: async <T>(url: string, body: unknown) =>
		fetchDecorator.wrap<T>(fetch, { url, body, method: "PUT" }),

	/**
	 * Deletes a resource from the server.
	 * @param url - The URL of the resource to delete.
	 * @returns The resource from the server.
	 */
	delete: async <T>(url: string) =>
		fetchDecorator.wrap<T>(fetch, { url, method: "DELETE" }),
};
