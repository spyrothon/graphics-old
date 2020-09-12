import * as React from "react";

import RemoteActionSenderManager from "../modules/remote/RemoteActionSenderManager";
import { updateGameName } from "../modules/run-info/RunInfoActions";
import TextInput from "./uikit/TextInput";
import Button from "./uikit/Button";
import Panel from "./uikit/Panel";
import Header from "./uikit/Header";

import styles from "./AdminDashboard.mod.css";
import RemoteConnectionPanel from "./panels/RemoteConnectionPanel";

export default function AdminDashboard() {
  const [gameName, setGameName] = React.useState("");

  function sendUpdate() {
    RemoteActionSenderManager.send(updateGameName(gameName));
  }

  return (
    <div className={styles.container}>
      <Header size={Header.Sizes.H1}>Graphics Dashboard</Header>
      <div className={styles.mosaic}>
        <Panel name="Run Info" className={styles.panelRunInfo}>
          <TextInput label="Game Name" onChange={(event) => setGameName(event.target.value)} />
          <Button onClick={() => sendUpdate()}>Set Game Name</Button>
        </Panel>
        <RemoteConnectionPanel className={styles.panelRemoteConnection} />
      </div>
    </div>
  );
}
