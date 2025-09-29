import { createOpenApiHttp } from "openapi-msw";
import { paths as ApiPaths } from "../../utils/generated";

export const http = createOpenApiHttp<ApiPaths>({
	baseUrl: ".",
});
