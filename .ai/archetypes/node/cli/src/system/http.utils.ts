export const http = {
	get: async (url: string, token?: string) => {
		try {
			const response = await fetch(url, {
				headers: createHeaders(token),
			});
			return createHttpResponse(response);
		} catch (error) {
			return {
				ok: false,
				status: 500,
				error: error.message,
				data: "error",
			};
		}
	},
	post: async (url: string, data: unknown) => {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: createHeaders(),
				body: JSON.stringify(data),
			});
			return createHttpResponse(response);
		} catch (error) {
			return {
				ok: false,
				status: 500,
				error: error.message,
				data: "error",
			};
		}
	},
};

function createHeaders(token?: string) {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

async function createHttpResponse(response: Response): Promise<HttpResponse> {
	if (response.ok) {
		return {
			ok: true,
			status: response.status,
			data: await response.json(),
		};
	}
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
