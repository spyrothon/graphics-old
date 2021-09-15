import * as React from "react";

import { ScheduleEntry } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSaveable from "../../hooks/useSaveable";
import useSafeDispatch from "../../hooks/useDispatch";
import * as ScheduleStore from "../../modules/schedules/ScheduleStore";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import { updateScheduleEntry } from "../schedules/ScheduleActions";

import styles from "./LiveEntryControl.mod.css";

type LiveEntryControlProps = {
  className?: string;
};

export default function LiveEntryControl(props: LiveEntryControlProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { currentEntry } = useSafeSelector((state) => ({
    currentEntry: ScheduleStore.getCurrentEntry(state),
  }));

  const [editedEntry, setEditedEntry] = React.useState<ScheduleEntry | undefined>(currentEntry);

  const [handleSave, getSaveText] = useSaveable(async () => {
    if (editedEntry == null) return;

    dispatch(updateScheduleEntry(editedEntry));
  });

  if (currentEntry == null || editedEntry == null) return null;

  const { obsSceneName } = editedEntry;

  return (
    <div className={className}>
      <div className={styles.form}>
        <Header size={Header.Sizes.H4}>Current Entry</Header>
        <OBSSceneSelector
          selectedSceneName={obsSceneName}
          onChange={(scene) => setEditedEntry({ ...editedEntry, obsSceneName: scene?.name })}
        />
        <Button onClick={handleSave}>{getSaveText()}</Button>
      </div>
    </div>
  );
}
