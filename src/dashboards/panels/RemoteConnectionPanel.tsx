import * as React from "react";

import { useSafeSelector } from "../../Store";
import * as RemoteStore from "../../modules/remote/RemoteStore";
import Panel from "../uikit/Panel";
import StatusDot from "../uikit/StatusDot";
import Header from "../uikit/Header";

export default function RemoteConnectionPanel(props: { className?: string }) {
  const isConnected = useSafeSelector(RemoteStore.isRemoteConnected);

  return (
    <Panel name="Connection Status" className={props.className}>
      <div>
        <Header size={Header.Sizes.H5} marginless>
          Graphics Socket
        </Header>
        <StatusDot boolean={isConnected} />
        <span style={{ marginLeft: 8 }}>{isConnected ? "Connected" : "Not Connected"}</span>
        <Header size={Header.Sizes.H5} marginless>
          API Socket
        </Header>
        <StatusDot boolean={isConnected} />
        <span style={{ marginLeft: 8 }}>{isConnected ? "Connected" : "Not Connected"}</span>
      </div>
    </Panel>
  );
}
