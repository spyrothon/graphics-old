import { RemoteAction, RemoteActionType } from "./RemoteTypes";

export function remoteConnected(): RemoteAction {
  return {
    type: RemoteActionType.REMOTE_CONNECTED,
  };
}

export function remoteDisconnected(): RemoteAction {
  return {
    type: RemoteActionType.REMOTE_DISCONNECTED,
  };
}
