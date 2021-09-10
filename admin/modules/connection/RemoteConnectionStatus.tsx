import * as React from "react";

import { useSafeSelector } from "../../Store";
import * as RemoteStore from "../../modules/remote/RemoteStore";
import StatusDot from "../../uikit/StatusDot";
import Header from "../../uikit/Header";

import styles from "./RemoteConnectionStatus.mod.css";
import { useOBSConnected, useOBSBusy } from "../obs/OBSStore";

export default function RemoteConnectionStatus() {
  const isConnected = useSafeSelector(RemoteStore.isRemoteConnected);
  const [obsConnected] = useOBSConnected();
  const { busy: obsBusy } = useOBSBusy();

  const obsStatus = obsBusy ? "Busy" : obsConnected ? "Connected" : "Not Connected";

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Header size={Header.Sizes.H5} marginless>
          Graphics Socket
        </Header>
        <div>
          <span style={{ marginRight: 8 }}>{isConnected ? "Connected" : "Not Connected"}</span>
          <StatusDot boolean={isConnected} />
        </div>
      </div>
      <div className={styles.item}>
        <Header size={Header.Sizes.H5} marginless>
          OBS Socket
        </Header>
        <div>
          <span style={{ marginRight: 8 }}>{obsStatus}</span>
          <StatusDot boolean={obsConnected} busy={obsBusy} />
        </div>
      </div>
    </div>
  );
}
