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
	if (response.ok) {
		const data = await getJson<T>(response);
		return {
			ok: true,
			status: response.status,
			data: data as T,
			errorMessage: "",
			error: undefined,
		};
	}
	const error = await getText(response);
	const errorMessage = `[${response.status}] ${response.statusText}: ${context}`;
	return {
		ok: false,
		status: response.status,
		data: {} as T,
		errorMessage,
		error,
	};
}

function buildNoResponse<T>(error: unknown): HttpResponse<T> {
	const message = error instanceof Error ? error.message : "Unknown";
	return {
		ok: false,
		status: 0,
		data: {} as T,
		errorMessage: `Unexpected http error: ${message}`,
		error: error,
	};
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
