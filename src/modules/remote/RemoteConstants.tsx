export const REMOTE_SYNC_HOST = process.env.SYNC_HOST;
export const REMOTE_WEBSOCKET_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";

export const REMOTE_SOCKET_PING_INTERVAL = 25000;
