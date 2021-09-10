import * as React from "react";
import deepEqual from "deep-equal";

import { ScheduleEntry } from "../../../api/APITypes";
import useSafeDispatch from "../../hooks/useDispatch";
import useSaveable, { SaveState } from "../../hooks/useSaveable";
import Button from "../../uikit/Button";
import DurationInput from "../../uikit/DurationInput";
import Header from "../../uikit/Header";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import { updateScheduleEntry } from "./ScheduleActions";

import styles from "./ScheduleEntryEditor.mod.css";

interface ScheduleEntryEditorProps {
  scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryEditor(props: ScheduleEntryEditorProps) {
  const { scheduleEntry } = props;

  const dispatch = useSafeDispatch();
  const [editedEntry, setEditedEntry] = React.useState(scheduleEntry);
  const hasChanges = !deepEqual(scheduleEntry, editedEntry);

  React.useEffect(() => {
    setEditedEntry(scheduleEntry);
  }, [scheduleEntry]);

  const [handleSave, getSaveText, saveState] = useSaveable(async () =>
    dispatch(updateScheduleEntry(editedEntry)),
  );

  return (
    <div className={styles.container}>
      <Button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={saveState === SaveState.SAVING || !hasChanges}>
        {getSaveText()}
      </Button>
      <div className={styles.editor}>
        <div>
          <Header className={styles.className}>Timing</Header>
          <DurationInput
            label="Estimated Setup Time"
            value={editedEntry.setupSeconds}
            onChange={(value) => setEditedEntry({ ...scheduleEntry, setupSeconds: value })}
          />
        </div>

        <div>
          <Header className={styles.className}>OBS Scene Setup</Header>
          <OBSSceneSelector
            selectedSceneName={editedEntry.obsSceneName}
            note="Name of the scene to use for this run in OBS."
            onChange={(scene) => setEditedEntry({ ...scheduleEntry, obsSceneName: scene?.name })}
          />
        </div>
      </div>
    </div>
  );
}
