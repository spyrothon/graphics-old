import SturdyWebsocket from "sturdy-websocket";

import { SafeDispatch } from "../../hooks/useDispatch";
import * as RunActions from "../runs/RunActions";
import forceResync from "./forceResync";
import { SocketActionTypes } from "./SocketTypes";
import { SOCKET_HOST } from "./SocketConstants";

const SOCKET = new SturdyWebsocket(SOCKET_HOST);

export function bindSocketToDispatch(dispatch: SafeDispatch) {
  SOCKET.onopen = function() {
    console.log("[Stream Socket] connected");
    dispatch(streamSocketOpened());
  };
  SOCKET.onreopen = function() {
    console.log("[Stream Socket] re-connected");
    dispatch(streamSocketOpened());
  };
  SOCKET.ondown = function() {
    console.log("[Stream Socket] closed. Reconnecting...");
    dispatch(streamSocketClosed());
  };
  SOCKET.onerror = function() {
    console.log("[Stream Socket] errored. Reconnecting...");
    dispatch(streamSocketClosed());
  };
  SOCKET.onmessage = function(event) {
    handleSocketUpdate(dispatch, event);
  };
}

export function syncStateToServer(state: object) {
  SOCKET.send(
    JSON.stringify({
      type: "state_sync",
      data: state,
    }),
  );
}

function handleSocketUpdate(dispatch: SafeDispatch, event: MessageEvent) {
  const data = JSON.parse(event.data);

  const { type } = data;

  switch (type) {
    case "run_started":
    case "run_finished":
    case "run_resumed":
    case "run_restarted":
      dispatch(RunActions.fetchRun(data.run_id));
      dispatch(RunActions.receiveRunUpdate(data));
      return;
    case "REMOTE_ACTION":
      const { action } = data;
      dispatch(action);
      return;
    case "FORCE_RESYNC":
      const { collection } = data.data;
      forceResync(dispatch, collection);
    default:
      return;
  }
}

export function streamSocketOpened() {
  return {
    type: SocketActionTypes.STREAM_SOCKET_OPENED,
  };
}

export function streamSocketClosed() {
  return {
    type: SocketActionTypes.STREAM_SOCKET_CLOSED,
  };
}
