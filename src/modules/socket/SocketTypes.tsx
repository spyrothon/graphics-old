export enum SocketActionTypes {
  STREAM_SOCKET_OPENED = "STREAM_SOCKET_OPENED",
  STREAM_SOCKET_CLOSED = "STREAM_SOCKET_CLOSED",
}

export type SocketAction = { type: "STREAM_SOCKET_CLOSED" } | { type: "STREAM_SOCKET_OPENED" };
