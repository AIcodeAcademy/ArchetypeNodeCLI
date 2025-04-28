export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const httpDecorator = async (
	fetchFn: (url: string, init?: RequestInit) => Promise<Response>,
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
		const response = await fetchFn(url, init);
		return createHttpResponse(response);
	} catch (error) {
		return {
			ok: false,
			status: 0,
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

async function createHttpResponse(response: Response): Promise<HttpResponse> {
	try {
		return await unpackResponse(response);
	} catch (error) {
		return {
			ok: false,
			status: 0,
			error: `Unpacking response error: ${error?.message}`,
		};
	}
}

async function unpackResponse(response: Response): Promise<HttpResponse> {
	if (response.ok) {
		const data = await response.json();
		return {
			ok: true,
			status: response.status,
			data,
		};
	}
	const errorText = await response.text();
	return {
		ok: false,
		status: response.status,
		error: `${response.statusText} ${errorText}`,
	};
}

export type HttpResponse = {
	ok: boolean;
	status: number;
	data?: unknown;
	error?: string;
};
