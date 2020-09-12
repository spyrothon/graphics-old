import { store } from "../../Store";
import { REMOTE_WEBSOCKET_PROTOCOL, REMOTE_SYNC_HOST } from "./RemoteConstants";
import ActionReceiver from "./ActionReceiver";

export default {
  init() {
    const socketURL = `${REMOTE_WEBSOCKET_PROTOCOL}:${REMOTE_SYNC_HOST}/`;
    const receiver = new ActionReceiver(store, socketURL);
    receiver.connect();
  },
};
