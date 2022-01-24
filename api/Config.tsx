import queryString from "query-string";

const { api_base: queryAPIBase, api_version: queryAPIVersion } = queryString.parse(
  window.location.search,
);

export const API_BASE = queryAPIBase || process.env.API_BASE;
export const API_VERSION = queryAPIVersion || process.env.API_VERSION;
export const API_ENDPOINT = `${API_BASE}/${API_VERSION}`;
export const ASSETS_URL = process.env.ASSETS_ENDPOINT;
// Used for forwarding users from Admin to App e.g., for previewing newsletters/schedules.
export const APP_HOST = process.env.APP_HOST;

export const SOCKET_SYNC_HOST = process.env.SYNC_HOST;
export const SOCKET_WEBSOCKET_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
// How long between heartbeats to keep the websocket alive
export const SOCKET_PING_INTERVAL = 25000;
