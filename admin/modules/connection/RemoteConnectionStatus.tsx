import * as React from "react";

import StatusDot from "@uikit/StatusDot";
import Header from "@uikit/Header";
import { useSafeSelector } from "../../Store";
import * as RemoteStore from "../../modules/remote/RemoteStore";

import styles from "./RemoteConnectionStatus.mod.css";
import { useOBSConnected, useOBSBusy } from "../obs/OBSStore";

export default function RemoteConnectionStatus() {
  const isConnected = useSafeSelector(RemoteStore.isRemoteConnected);
  const [obsConnected] = useOBSConnected();
  const { busy: obsBusy } = useOBSBusy();

  return (
    <div className={styles.container}>
      <Header size={Header.Sizes.H5} marginless>
        Connections
      </Header>
      <div className={styles.items}>
        <div className={styles.item}>
          <StatusDot boolean={isConnected} />
          <span className={styles.itemName}>Graphics</span>
        </div>
        <div className={styles.item}>
          <StatusDot boolean={obsConnected} busy={obsBusy} />
          <span className={styles.itemName}>OBS</span>
        </div>
      </div>
    </div>
  );
}
