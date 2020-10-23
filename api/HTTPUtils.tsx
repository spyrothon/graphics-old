import queryString from "query-string";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

import { API_ENDPOINT } from "./Config";

export enum HTTPVerb {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const Encoders = {
  JSON: {
    module: { ...JSON, stringify: (data: any) => JSON.stringify(snakecaseKeys(data)) },
    contentType: "application/json",
  },
  QUERY: {
    module: queryString,
    contentType: "application/x-www-form-urlencoded",
  },
};

function checkStatus(response: Response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response;
  } else {
    throw response;
  }
}

function parseJSON<T>(json: object): T {
  return (camelcaseKeys(json, { deep: true }) as unknown) as T;
}

function skipsCSRF(method: string) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/i.test(method);
}

function getDefaultHeaders(method: string) {
  const headers: { [header: string]: any } = {
    "Content-Type": "application/json",
  };

  if (!skipsCSRF(method)) {
    // headers["X-CSRFToken"] = Cookies.get("csrftoken");
  }

  return headers;
}

type CommonOptions = {
  headers?: { [header: string]: any };
};

type GetOptions = CommonOptions;

export async function get<T>(url: string, queryParams?: object, opts: GetOptions = {}) {
  const { headers } = opts;
  const query = queryParams != null ? "?" + queryString.stringify(queryParams) : "";

  return send<T>(HTTPVerb.GET, `${url}${query}`, { headers });
}

type PostOptions = CommonOptions & {
  encoder?: typeof Encoders[keyof typeof Encoders];
};

export async function post<T>(url: string, data?: object, opts: PostOptions = {}) {
  const { headers, encoder = Encoders.JSON } = opts;

  return send<T>(HTTPVerb.POST, url, {
    headers: {
      "Content-Type": encoder.contentType,
      ...headers,
    },
    body: encoder.module.stringify(data),
  });
}

export async function put<T>(url: string, data: object, opts: PostOptions = {}) {
  const { headers, encoder = Encoders.JSON } = opts;

  return send<T>(HTTPVerb.PUT, url, {
    headers: {
      "Content-Type": encoder.contentType,
      ...headers,
    },
    body: encoder.module.stringify(data),
  });
}

type DeleteOptions = CommonOptions;

export async function del<T>(url: string, opts: DeleteOptions = {}) {
  const { headers } = opts;

  return send<T>(HTTPVerb.DELETE, url, {
    headers: {
      ...headers,
    },
  });
}

export async function send<T>(verb: HTTPVerb, url: string, options?: RequestInit): Promise<T> {
  // Prepend API_BASE_URL on plain-path requests
  const resolvedUrl = url[0] === "/" ? `${API_ENDPOINT}${url}` : url;

  const response = await fetch(resolvedUrl, {
    method: verb,
    ...getDefaultHeaders(verb),
    ...options,
  });
  checkStatus(response);

  const json = await response.json();
  return parseJSON<T>(json);
}

export default {
  get,
  post,
  put,
  delete: del,
  send,
  Encoders,
};
