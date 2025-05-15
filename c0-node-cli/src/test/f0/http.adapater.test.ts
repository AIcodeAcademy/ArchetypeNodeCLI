import assert from "node:assert";
import { describe, mock, test } from "node:test";
import type { HttpResponse } from "../../app/shared/http/http-response.type";
import { http } from "../../app/shared/http/http.adapter.ts";

/**
 * Given an HTTP adapter
 *  When making a GET request
 *   Then it should return the response data
 *  When making a POST request
 *   Then it should send the body and return the response data
 *  When making a PUT request
 *   Then it should send the body and return the response data
 *  When making a DELETE request
 *   Then it should return the response data
 */
describe("Given an HTTP adapter", () => {
	const mockUrl = "https://api.example.com";
	const mockResponse = { data: "test" };
	const mockBody = { key: "value" };

	describe("When making a GET request", () => {
		test("Then it should return the response data", async () => {
			// Arrange
			mock.method(
				globalThis,
				"fetch",
				async () =>
					new Response(JSON.stringify(mockResponse), {
						status: 200,
						headers: { "Content-Type": "application/json" },
					}),
			);

			// Act
			const actual = await http.get<typeof mockResponse>(mockUrl);

			// Assert
			const expected: HttpResponse<typeof mockResponse> = {
				status: 200,
				value: mockResponse,
				error: undefined,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});

	describe("When making a POST request", () => {
		test("Then it should send the body and return the response data", async () => {
			// Arrange
			let actualBody: unknown;
			mock.method(globalThis, "fetch", async (url, options) => {
				actualBody = options?.body
					? JSON.parse(options.body as string)
					: undefined;
				return new Response(JSON.stringify(mockResponse), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			// Act
			const actual = await http.post<typeof mockResponse>(mockUrl, mockBody);

			// Assert
			const expected: HttpResponse<typeof mockResponse> = {
				status: 200,
				value: mockResponse,
				error: undefined,
			};
			assert.deepStrictEqual(actual, expected);
			assert.deepStrictEqual(actualBody, mockBody);
		});
	});

	describe("When making a PUT request", () => {
		test("Then it should send the body and return the response data", async () => {
			// Arrange
			let actualBody: unknown;
			mock.method(globalThis, "fetch", async (url, options) => {
				actualBody = options?.body
					? JSON.parse(options.body as string)
					: undefined;
				return new Response(JSON.stringify(mockResponse), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			// Act
			const actual = await http.put<typeof mockResponse>(mockUrl, mockBody);

			// Assert
			const expected: HttpResponse<typeof mockResponse> = {
				status: 200,
				value: mockResponse,
				error: undefined,
			};
			assert.deepStrictEqual(actual, expected);
			assert.deepStrictEqual(actualBody, mockBody);
		});
	});

	describe("When making a DELETE request", () => {
		test("Then it should return the response data", async () => {
			// Arrange
			mock.method(
				globalThis,
				"fetch",
				async () =>
					new Response(JSON.stringify(mockResponse), {
						status: 200,
						headers: { "Content-Type": "application/json" },
					}),
			);

			// Act
			const actual = await http.delete<typeof mockResponse>(mockUrl);

			// Assert
			const expected: HttpResponse<typeof mockResponse> = {
				status: 200,
				value: mockResponse,
				error: undefined,
			};
			assert.deepStrictEqual(actual, expected);
		});
	});
});
