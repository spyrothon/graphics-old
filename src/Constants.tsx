import queryString from "query-string";

const { api_base: queryAPIBase, api_version: queryAPIVersion } = queryString.parse(
  window.location.search,
);

export const API_BASE = queryAPIBase || process.env.API_BASE;
export const API_VERSION = queryAPIVersion || process.env.API_VERSION;
export const API_ENDPOINT = `${API_BASE}/${API_VERSION}`;
export const ASSETS_URL = process.env.ASSETS_ENDPOINT;

export const Endpoints = {
  RUNS: "/runs",
};
