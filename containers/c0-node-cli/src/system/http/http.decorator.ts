export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type HttpResponse<T> = {
	ok: boolean;
	status: number;
	data: T;
	error: string;
};

type decoratedFetch = (url: string, init?: RequestInit) => Promise<Response>;

export const httpDecorator = {
	wrap: async <T>(
		fetchFn: decoratedFetch,
		url: string,
		body?: unknown,
		method?: HttpMethod,
	): Promise<HttpResponse<T>> => {
		try {
			const init = buildRequestInit(body, method);
			const response = await fetchFn(url, init);
			return buildHttpResponse<T>(response);
		} catch (error) {
			return buildResponseError<T>(error);
		}
	},
};

function buildRequestInit(body?: unknown, method?: HttpMethod) {
	return {
		method: method || body ? "POST" : "GET",
		headers: buildHeaders(),
		body: body ? JSON.stringify(body) : undefined,
	};
}

function buildHeaders() {
	const token = "to be provided from environment or config file";
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

async function buildHttpResponse<T>(
	response: Response,
): Promise<HttpResponse<T>> {
	try {
		return await unpackResponse<T>(response);
	} catch (error) {
		return {
			ok: false,
			status: 0,
			data: {} as T,
			error: `Unpacking response error: ${error?.message}`,
		};
	}
}

async function unpackResponse<T>(response: Response): Promise<HttpResponse<T>> {
	if (response.ok) {
		const data = await response.json();
		return {
			ok: true,
			status: response.status,
			data: data as T,
			error: "",
		};
	}
	const errorText = await response.text();
	return {
		ok: false,
		status: response.status,
		data: {} as T,
		error: `${response.statusText} ${errorText}`,
	};
}

function buildResponseError<T>(error: unknown) {
	const message = error instanceof Error ? error.message : "Unknown error";
	return {
		ok: false,
		status: 0,
		data: {} as T,
		error: `Unexpected http error: ${message}`,
	};
}
