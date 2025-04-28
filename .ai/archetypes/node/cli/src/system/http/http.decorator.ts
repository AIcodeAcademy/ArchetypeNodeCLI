export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const httpDecorator = async <T>(
	fetchFn: (url: string, init?: RequestInit) => Promise<Response>,
	url: string,
	body?: unknown,
	method?: "POST" | "GET" | "PUT" | "DELETE",
): Promise<HttpResponse<T>> => {
	try {
		const init: RequestInit = {
			method: method || body ? "POST" : "GET",
			headers: createHeaders(),
			body: body ? JSON.stringify(body) : undefined,
		};
		const response = await fetchFn(url, init);
		return createHttpResponse<T>(response);
	} catch (error) {
		return {
			ok: false,
			status: 0,
			data: {} as T,
			error: `Unexpected http error: ${error?.message}`,
		};
	}
};

function createHeaders() {
	const token = "to be provided from environment or config file";
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

async function createHttpResponse<T>(
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

export type HttpResponse<T> = {
	ok: boolean;
	status: number;
	data: T;
	error: string;
};
