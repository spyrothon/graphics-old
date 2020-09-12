import { store } from "../../Store";
import { REMOTE_WEBSOCKET_PROTOCOL, REMOTE_SYNC_HOST } from "./RemoteConstants";
import SyncReceiver from "./SyncReceiver";

export default {
  init() {
    const socketURL = `${REMOTE_WEBSOCKET_PROTOCOL}:${REMOTE_SYNC_HOST}/`;
    const receiver = new SyncReceiver(store, socketURL);
    receiver.connect();
  },
};
