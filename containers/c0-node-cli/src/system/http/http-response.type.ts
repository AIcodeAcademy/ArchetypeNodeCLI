export type HttpResponse<T> = {
	ok: boolean;
	status: number;
	data: T;
	error: string;
};

export const DEFAULT_HTTP_RESPONSE: HttpResponse<unknown> = {
	ok: false,
	status: 0,
	data: {},
	error: "Unknown error",
};
