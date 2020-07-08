import queryString from "query-string";

const SOCKET_PATH = "/api/live/stream";

function getSocketURL() {
  if (process.env.SOCKET_HOST) return process.env.SOCKET_HOST;
  const { socket_host } = queryString.parse(window.location.search);

  if (socket_host) return socket_host as string;

  const { host, protocol } = window.location;

  const wsProto = protocol == "https" ? "wss" : "ws";

  return `${wsProto}://${host}${SOCKET_PATH}`;
}

export const SOCKET_HOST = getSocketURL();

export const SOCKET_SYNC_INTERVAL = 10000;
