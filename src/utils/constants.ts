export const vscodeDebugConfig = {
  configurations: [
    {
      command: "npm run dev --inspect",
      name: "npm run dev --inspect",
      request: "launch",
      type: "node-terminal",
    },
  ],
};

export const clientCode = {
  url: `
import {baseUrl} from "$env/static/private"
import axios from "axios"
import {debugResponse, debugRequest} from "$lib/utils/debugger"
  `,
  client: `
const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.response.use(
  (response) => {
    debugResponse(response);
    return response;
  },
  (error) => {
    debugResponse(error.response, error);
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  (config) => {
    debugRequest(config);
    return config;
  },
  (error) => {
    debugRequest(error.config);
    return Promise.reject(error);
  }
)

export {client}`,
};

export const debuggerCode = `
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

let httpMethod = "";
let endpnt = "";

export const debugResponse = async (
  response: AxiosResponse<any> | null,
  error: AxiosError<any> | null = null
) => {
  try {
    // Determina si es una respuesta exitosa o un error
    const method =
      (response ? response.config.method : error?.config?.method) || "UNKNOWN";
    const endpoint =
      (response ? response.config.url : error?.config?.url) || "UNKNOWN";

    httpMethod = method;
    endpnt = endpoint;
    const isSuccess =
      response && response.status >= 200 && response.status < 300;
    const color = isSuccess ? "[1;32m" : "[1;31m";

    const headers = response ? response.config.headers : error?.config?.headers;

    // Datos de la respuesta o error
    let data = isSuccess
      ? response?.data
      : error?.response?.data || "NO RES DATA";

    console.log(color, \`\${method}: \${endpoint} \${response?.status}\`, "\\n", {
      HEADER: headers,
      RESPONSE: { status: response?.status, data },
    });
  } catch (e) {
    console.log("ha ocurrido un error con debugger");
    console.error(\`\${httpMethod}: \${endpnt}\`, {
      error: e,
      response,
      status: response?.status,
    });
  }
};

export const debugRequest = (config: AxiosRequestConfig) => {
  const color = "[1;32m";
  console.log(
    color,
    \`Request \${config.method} \${config.url}\\nHeaders: \${config.headers}\\n\${
      config.data ? "Payload: " + config.data : ""
    }\`
  );
  return config;
};
`;

export const appLocalsCode = {
  imports: `
import { AxiosInstance } from "axios";
  `,
  inLocals: `
    interface Locals {
      svelxios: AxiosInstance;
    }
  `
};

export const hooksCode = {
  handlers: `
const clientHandler: Handle=async ({event, resolve}) => {
  event.locals.svelxios = client;

  return await resolve (event)
}

const trackers: Handle=async ({event, resolve}) => {
  return await resolve (event)
}

export const handle = sequence(clientHandler, trackers);
  `,
  import: `
import { client } from "$lib/server/client";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
  `,
};
