import queryString from "query-string";

const { api_base: queryAPIBase } = queryString.parse(window.location.search);

export const API_BASE_URL = queryAPIBase || process.env.API_ENDPOINT;
export const ASSETS_URL = process.env.ASSETS_ENDPOINT;
