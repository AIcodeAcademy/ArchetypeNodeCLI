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
		return buildHttpResponse<T>(response);
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
): Promise<HttpResponse<T>> {
	if (response.ok) {
		const data = await response.json();
		return {
			ok: true,
			status: response.status,
			data: data as T,
			errorMessage: "",
			error: undefined,
		};
	}
	const errorText = await response.text();
	return {
		ok: false,
		status: response.status,
		data: {} as T,
		errorMessage: `${response.statusText} ${errorText}`,
		error: undefined,
	};
}

function buildNoResponse<T>(error: unknown): HttpResponse<T> {
	const message = error instanceof Error ? error.message : "Unknown error";
	return {
		ok: false,
		status: 0,
		data: {} as T,
		errorMessage: `Unexpected error: ${message}`,
		error: error,
	};
}
