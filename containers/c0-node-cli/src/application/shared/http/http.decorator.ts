import type { HttpRequest } from "./http-request.type";
import type { HttpResponse } from "./http-response.type";

type decoratedFetch = (url: string, init?: RequestInit) => Promise<Response>;

export const httpDecorator = async <T>(
	fetchFn: decoratedFetch,
	request: HttpRequest,
): Promise<HttpResponse<T>> => {
	try {
		const init = buildRequest(request);
		const response = await fetchFn(request.url, init);
		return buildHttpResponse<T>(response, request.url);
	} catch (error) {
		return buildNoResponse<T>(error);
	}
};

function buildRequest(request: HttpRequest): RequestInit {
	return {
		method: request.method || request.body ? "POST" : "GET",
		headers: buildHeaders(request),
		body: request.body ? JSON.stringify(request.body) : undefined,
	};
}

function buildHeaders(request: HttpRequest): HeadersInit {
	const token = request.token || "to be provided";
	const apiKey = request.apiKey || "to be provided";
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		"X-API-Key": apiKey,
	};
}

async function buildHttpResponse<T>(
	response: Response,
	context: string,
): Promise<HttpResponse<T>> {
	const payload = await getPayload<T>(response);
	if (response.ok) {
		const value = payload || {};
		return {
			status: response.status,
			value: value as T,
			error: undefined,
		};
	}
	const errorMessage = `[${response.status}] ${response.statusText} : ${context}`;
	const error = new Error(errorMessage, { cause: payload });
	return {
		status: response.status,
		value: {} as T,
		error,
	};
}

function buildNoResponse<T>(error: unknown): HttpResponse<T> {
	return {
		status: 0,
		value: {} as T,
		error,
	};
}
async function getPayload<T>(response: Response): Promise<T | undefined> {
	let payload = await getJson<T>(response);
	if (!payload) {
		const text = await getText(response);
		if (text) {
			payload = JSON.parse(text);
		}
	}
	return payload;
}

async function getJson<T>(response: Response): Promise<T | undefined> {
	try {
		return await response.json();
	} catch (error) {
		return undefined;
	}
}

async function getText(response: Response): Promise<string | undefined> {
	try {
		return await response.text();
	} catch (error) {
		return undefined;
	}
}
