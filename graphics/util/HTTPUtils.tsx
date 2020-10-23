import queryString from "query-string";
import { API_ENDPOINT } from "../Constants";

export enum HTTPVerb {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const Encoders = {
  JSON: {
    module: JSON,
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

function parseJSON(response: Response) {
  return response.json();
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

export async function get(url: string, queryParams?: object, opts: GetOptions = {}) {
  const { headers } = opts;
  const query = queryParams != null ? "?" + queryString.stringify(queryParams) : "";

  return send(HTTPVerb.GET, `${url}${query}`, { headers });
}

type PostOptions = CommonOptions & {
  encoder?: typeof Encoders[keyof typeof Encoders];
};

export async function post(url: string, data?: object, opts: PostOptions = {}) {
  const { headers, encoder = Encoders.JSON } = opts;

  return send(HTTPVerb.POST, url, {
    headers: {
      "Content-Type": encoder.contentType,
      ...headers,
    },
    body: encoder.module.stringify(data),
  });
}

export async function put(url: string, data: object, opts: PostOptions = {}) {
  const { headers, encoder = Encoders.JSON } = opts;

  return send(HTTPVerb.PUT, url, {
    headers: {
      "Content-Type": encoder.contentType,
      ...headers,
    },
    body: encoder.module.stringify(data),
  });
}

type DeleteOptions = CommonOptions;

export async function del(url: string, opts: DeleteOptions = {}) {
  const { headers } = opts;

  return send(HTTPVerb.PUT, url, {
    headers: {
      ...headers,
    },
  });
}

export async function send(verb: HTTPVerb, url: string, options?: RequestInit) {
  // Prepend API_BASE_URL on plain-path requests
  const resolvedUrl = url[0] === "/" ? `${API_ENDPOINT}${url}` : url;

  const response = await fetch(resolvedUrl, {
    method: verb,
    ...getDefaultHeaders(verb),
    ...options,
  });
  return parseJSON(checkStatus(response));
}

export default {
  get,
  post,
  put,
  delete: del,
  send,
  Encoders,
};
