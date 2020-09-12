import * as React from "react";
import RemoteSyncSenderManager from "../modules/remote/RemoteSyncSenderManager";
import { updateGameName } from "../modules/run-info/RunInfoActions";

export default function AdminDashboard() {
  const [gameName, setGameName] = React.useState("");

  function sendUpdate() {
    RemoteSyncSenderManager.send(updateGameName(gameName));
  }

  return (
    <div>
      <input onChange={(event) => setGameName(event.target.value)} />
      <button onClick={() => sendUpdate()}>Set Game Name</button>
    </div>
  );
}
