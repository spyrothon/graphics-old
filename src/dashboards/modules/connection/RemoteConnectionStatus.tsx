import * as React from "react";

import { useSafeSelector } from "../../../Store";
import * as RemoteStore from "../../../modules/remote/RemoteStore";
import StatusDot from "../../uikit/StatusDot";
import Header from "../../uikit/Header";

import styles from "./RemoteConnectionStatus.mod.css";

export default function RemoteConnectionStatus() {
  const isConnected = useSafeSelector(RemoteStore.isRemoteConnected);

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
          API Socket
        </Header>
        <div>
          <StatusDot boolean={isConnected} />
          <span style={{ marginLeft: 8 }}>{isConnected ? "Connected" : "Not Connected"}</span>
        </div>
      </div>
    </div>
  );
}
