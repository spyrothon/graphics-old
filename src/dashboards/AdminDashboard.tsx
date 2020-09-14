import * as React from "react";

import RemoteActionSenderManager from "../modules/remote/RemoteActionSenderManager";
import { RunInfo } from "../modules/run-info/RunInfo";
import { updateCurrentRun } from "../modules/run-info/RunInfoActions";
import AllRunsPanel from "./panels/AllRunsPanel";
import RemoteConnectionPanel from "./panels/RemoteConnectionPanel";
import TextInput from "./uikit/TextInput";
import Button from "./uikit/Button";
import Panel from "./uikit/Panel";
import Header from "./uikit/Header";

import styles from "./AdminDashboard.mod.css";

export default function AdminDashboard() {
  const [editableRun, updateEditableRun] = React.useState<Partial<RunInfo>>({});

  function sendUpdate() {
    RemoteActionSenderManager.send(updateCurrentRun({ ...editableRun }));
  }

  return (
    <div className={styles.container}>
      <Header size={Header.Sizes.H1}>Graphics Dashboard</Header>
      <div className={styles.mosaic}>
        <Panel name="Run Info" className={styles.panelRunInfo}>
          <TextInput
            label="Game Name"
            onChange={(event) =>
              updateEditableRun((run) => ({ ...run, gameName: event.target.value }))
            }
          />
          <TextInput
            label="Category Name"
            onChange={(event) =>
              updateEditableRun((run) => ({ ...run, categoryName: event.target.value }))
            }
          />
          <div className={styles.inputRow}>
            <TextInput
              label="Estimate"
              onChange={(event) =>
                updateEditableRun((run) => ({
                  ...run,
                  estimatedTime: parseInt(event.target.value),
                }))
              }
            />
            <TextInput
              label="Platform"
              onChange={(event) =>
                updateEditableRun((run) => ({ ...run, platform: event.target.value }))
              }
            />
            <TextInput
              label="Release Year"
              onChange={(event) =>
                updateEditableRun((run) => ({ ...run, releaseYear: event.target.value }))
              }
            />
          </div>
          <TextInput
            label="Notes"
            onChange={(event) =>
              updateEditableRun((run) => ({ ...run, notes: event.target.value }))
            }
          />
          <Button onClick={() => sendUpdate()}>Update Current Run</Button>
        </Panel>
        <RemoteConnectionPanel className={styles.panelRemoteConnection} />
        <AllRunsPanel className={styles.panelAllRuns} />
      </div>
    </div>
  );
}
