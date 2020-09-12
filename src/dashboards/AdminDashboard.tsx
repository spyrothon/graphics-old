import * as React from "react";
import RemoteSyncSenderManager from "../modules/remote/RemoteSyncSenderManager";
import { updateGameName } from "../modules/run-info/RunInfoActions";
import TextInput from "./uikit/TextInput";
import Button from "./uikit/Button";

export default function AdminDashboard() {
  const [gameName, setGameName] = React.useState("");

  function sendUpdate() {
    RemoteSyncSenderManager.send(updateGameName(gameName));
  }

  return (
    <div>
      <TextInput label="Game Name" onChange={(event) => setGameName(event.target.value)} />
      <Button onClick={() => sendUpdate()}>Set Game Name</Button>
    </div>
  );
}
