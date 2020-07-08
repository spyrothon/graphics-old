import * as React from "react";
import { useStore } from "react-redux";

import { syncStateToServer } from "./Socket";
import { SOCKET_SYNC_INTERVAL } from "./SocketConstants";

export default function StateSync() {
  const store = useStore();

  React.useEffect(() => {
    const interval = setInterval(() => {
      syncStateToServer(store.getState());
    }, SOCKET_SYNC_INTERVAL);

    return () => clearInterval(interval);
  }, [store]);

  return null;
}
