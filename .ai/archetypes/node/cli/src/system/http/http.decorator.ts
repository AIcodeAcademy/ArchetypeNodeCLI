import { getLog } from "../log/log.singleton.ts";

export const httpDecorator = async (
	fn: (url: string, init?: RequestInit) => Promise<Response>,
	url: string,
	body?: unknown,
	method?: "POST" | "GET" | "PUT" | "DELETE",
) => {
	try {
		const init: RequestInit = {
			method: method || body ? "POST" : "GET",
			headers: createHeaders(),
			body: body ? JSON.stringify(body) : undefined,
		};
		const response = await fn(url, init);
		return createHttpResponse(response);
	} catch (error) {
		return createHttpResponse(undefined, error as Error);
	}
};

function createHeaders() {
	const token = "to be provided from environment or config file";
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

async function createHttpResponse(
	response?: Response,
	error?: Error,
): Promise<HttpResponse> {
	if (!response) {
		getLog().error("No response", error);
		return {
			ok: false,
			status: 500,
			error: error?.message || "Unknown error",
			data: "error",
		};
	}
	if (response.ok) {
		return {
			ok: true,
			status: response.status,
			data: await response.json(),
		};
	}
	getLog().warn("HTTP error", response.statusText);
	return {
		ok: false,
		status: response.status,
		error: `${response.statusText} ${await response.text()}`,
	};
}

export type HttpResponse = {
	ok: boolean;
	status: number;
	data?: unknown;
	error?: string;
};
