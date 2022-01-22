import * as React from "react";

import { ScheduleEntry } from "@api/APITypes";
import useSaveable from "@common/hooks/useSaveable";
import useSafeDispatch from "@admin/hooks/useDispatch";
import Button from "@uikit/Button";
import Header from "@uikit/Header";
import { useSafeSelector } from "../../Store";
import * as ScheduleStore from "../../modules/schedules/ScheduleStore";
import OBS from "../obs/OBS";
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
  React.useEffect(() => setEditedEntry(currentEntry), [currentEntry]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    if (editedEntry == null) return;

    dispatch(updateScheduleEntry(editedEntry));
  });

  function handleSetPreview() {
    const sceneName = editedEntry?.obsSceneName;
    if (sceneName == null) return;

    OBS.setPreviewScene(sceneName);
  }

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
        <div className={styles.actions}>
          <Button onClick={handleSave}>{getSaveText()}</Button>
          <Button onClick={handleSetPreview}>Set Preview Scene</Button>
        </div>
      </div>
    </div>
  );
}
