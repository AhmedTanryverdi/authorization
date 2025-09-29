import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths as ApiPaths } from "../utils/generated";

export const fetchClient = createFetchClient<ApiPaths>({ baseUrl: "./" });

export const rqClient = createClient(fetchClient);
