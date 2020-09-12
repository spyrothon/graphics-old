export enum RemoteActionType {
  REMOTE_CONNECTED = "REMOTE_CONNECTED",
  REMOTE_DISCONNECTED = "REMOTE_DISCONNECTED",
}

export type RemoteAction =
  | {
      type: RemoteActionType.REMOTE_CONNECTED;
    }
  | {
      type: RemoteActionType.REMOTE_DISCONNECTED;
    };
