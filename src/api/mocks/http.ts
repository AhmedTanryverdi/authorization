import { createOpenApiHttp } from "openapi-msw";

export const http = createOpenApiHttp({
	baseUrl: "./",
});
