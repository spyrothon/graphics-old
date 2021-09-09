import * as React from "react";

import { useSafeSelector } from "../../Store";
import * as RemoteStore from "../../modules/remote/RemoteStore";
import StatusDot from "../../uikit/StatusDot";
import Header from "../../uikit/Header";

import styles from "./RemoteConnectionStatus.mod.css";
import { useOBSConnected } from "../obs/OBSStore";

export default function RemoteConnectionStatus() {
  const isConnected = useSafeSelector(RemoteStore.isRemoteConnected);
  const [obsConnected] = useOBSConnected();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Header size={Header.Sizes.H5} marginless>
          Graphics Socket
        </Header>
        <div>
          <StatusDot boolean={isConnected} />
          <span style={{ marginLeft: 8 }}>{isConnected ? "Connected" : "Not Connected"}</span>
        </div>
      </div>
      <div className={styles.item}>
        <Header size={Header.Sizes.H5} marginless>
          OBS Socket
        </Header>
        <div>
          <StatusDot boolean={obsConnected} />
          <span style={{ marginLeft: 8 }}>{obsConnected ? "Connected" : "Not Connected"}</span>
        </div>
      </div>
    </div>
  );
}
