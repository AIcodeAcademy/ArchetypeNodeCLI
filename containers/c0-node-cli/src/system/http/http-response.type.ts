export type HttpResponse<T> = {
	ok: boolean;
	status: number;
	data: T;
	errorMessage: string;
	error: unknown;
};

export const DEFAULT_HTTP_RESPONSE: HttpResponse<unknown> = {
	ok: false,
	status: 0,
	data: {},
	errorMessage: "Unknown error",
	error: undefined,
};
