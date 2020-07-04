import { SocketAction, SocketActionTypes } from "./SocketTypes";

type SocketState = {
  connected: boolean;
};

const defaultState: SocketState = { connected: false };

function handleStreamSocketOpened(state: SocketState) {
  return {
    ...state,
    connected: true,
  };
}

function handleStreamSocketClosed(state: SocketState) {
  return {
    ...state,
    connected: false,
  };
}
export function socketReducer(state = defaultState, action: SocketAction): SocketState {
  switch (action.type) {
    case SocketActionTypes.STREAM_SOCKET_CLOSED:
      return handleStreamSocketClosed(state);
    case SocketActionTypes.STREAM_SOCKET_OPENED:
      return handleStreamSocketOpened(state);
  }

  return state;
}
