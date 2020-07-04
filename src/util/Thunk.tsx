import _ from "lodash";

import { SafeDispatch } from "../hooks/useDispatch";
import * as FetchingActions from "../modules/fetching/FetchingActions";

import { API_BASE_URL } from "../Constants";

export const defaultHeaders = {
  Accept: "application/json",
};

export function checkStatus(response: Response) {
  if ((response.status >= 200 && response.status < 300) || response.status == 422) {
    return response;
  } else {
    throw response;
  }
}

export function parseJSON(response: Response) {
  return response.json();
}

type ThunkOptions = {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  credentials?: "include";
  name?: string;
  query?: object;
  body?: any;
};

export function commonThunk<ResponseStructure>(
  opts: ThunkOptions,
  then: (d: SafeDispatch, r: ResponseStructure) => unknown,
) {
  const { path, method = "GET", credentials = "include", name, query, body } = opts;
  const fetchId = name || path;
  const url = `${API_BASE_URL}${path}?${query ? params(query) : ""}`;

  return async (dispatch: SafeDispatch) => {
    dispatch(FetchingActions.fetchStarted(fetchId));
    const response = await fetch(url, {
      headers: defaultHeaders,
      method: method.toUpperCase(),
      credentials: credentials,
      body: JSON.stringify(body),
    });
    checkStatus(response);
    const parsedResponse = await parseJSON(response);
    dispatch(FetchingActions.fetchSucceeded(fetchId));
    then?.(dispatch, parsedResponse);
  };
}

export function denulled<T extends object>(object: T) {
  return _.reduce(
    object,
    (acc, value, key) => {
      // @ts-ignore idk how to handle object access
      if (value != null) acc[key] = value;
      return acc;
    },
    {},
  );
}

function params(data: { [key: string]: any }) {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
}
