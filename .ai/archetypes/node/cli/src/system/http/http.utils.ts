import { httpDecorator } from "./http.decorator.ts";

export const http = {
	get: async (url: string) => {
		return httpDecorator(fetch, url);
	},

	post: async (url: string, data: unknown) => {
		return httpDecorator(fetch, url, data);
	},

	put: async (url: string, data: unknown) => {
		return httpDecorator(fetch, url, data, "PUT");
	},

	delete: async (url: string) => {
		return httpDecorator(fetch, url, undefined, "DELETE");
	},
};
