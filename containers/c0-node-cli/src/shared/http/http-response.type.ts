export type HttpResponse<T> = {
	status: number;
	value: T;
	error: unknown;
};

export const DEFAULT_HTTP_RESPONSE: HttpResponse<unknown> = {
	status: 0,
	value: {},
	error: undefined,
};
