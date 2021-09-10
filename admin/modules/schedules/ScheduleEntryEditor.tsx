import * as React from "react";
import { v4 as uuid } from "uuid";

import { ScheduleEntry, InitialTransition, InitialScheduleEntry } from "../../../api/APITypes";
import useSafeDispatch from "../../hooks/useDispatch";
import useSaveable, { SaveState } from "../../hooks/useSaveable";
import Button from "../../uikit/Button";
import DurationInput from "../../uikit/DurationInput";
import Header from "../../uikit/Header";
import OBS from "../obs/OBS";
import OBSButton from "../obs/OBSButton";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import { updateScheduleEntry } from "./ScheduleActions";
import TransitionEditor from "./TransitionEditor";

import styles from "./ScheduleEntryEditor.mod.css";

interface ScheduleEntryEditorProps {
  scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryEditor(props: ScheduleEntryEditorProps) {
  const { scheduleEntry } = props;

  const dispatch = useSafeDispatch();
  const [editedEntry, setEditedEntry] = React.useState<InitialScheduleEntry>(scheduleEntry);
  const hasChanges = JSON.stringify(editedEntry) !== JSON.stringify(scheduleEntry);

  React.useEffect(() => {
    setEditedEntry(scheduleEntry);
  }, [scheduleEntry]);

  const [handleSave, getSaveText, saveState] = useSaveable(async () =>
    dispatch(updateScheduleEntry(editedEntry as ScheduleEntry)),
  );

  function updateTransition(
    kind: "enterTransitions" | "exitTransitions",
    newTransition: InitialTransition,
    index: number,
  ) {
    const transitions = Array.from(editedEntry[kind] ?? []);
    transitions[index] = newTransition;
    setEditedEntry({ ...editedEntry, [kind]: transitions });
  }

  function removeTransition(kind: "enterTransitions" | "exitTransitions", index: number) {
    const transitions = Array.from(editedEntry[kind] ?? []);
    transitions.splice(index, 1);
    setEditedEntry({ ...editedEntry, [kind]: transitions });
  }

  function addTransition(kind: "enterTransitions" | "exitTransitions") {
    const transitions = Array.from(editedEntry[kind] ?? []);
    transitions.push({ id: uuid() });
    setEditedEntry({ ...editedEntry, [kind]: transitions });
  }

  function runEnterTransition() {
    OBS.executeTransitionSet(scheduleEntry.enterTransitions);
  }

  function reorderTransitions(
    kind: "enterTransitions" | "exitTransitions",
    direction: "up" | "down",
    index: number,
  ) {
    const transitions = Array.from(editedEntry[kind] ?? []);
    const [item] = transitions.splice(index, 1);
    switch (direction) {
      case "up":
        transitions.splice(index - 1, 0, item);
        break;
      case "down":
        transitions.splice(index + 1, 0, item);
        break;
    }
    setEditedEntry({ ...editedEntry, [kind]: transitions });
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={!hasChanges || saveState === SaveState.SAVING}>
        {getSaveText()}
      </Button>
      <OBSButton onClick={() => runEnterTransition()}>Test</OBSButton>
      <div className={styles.editor}>
        <div>
          <Header className={styles.header}>Timing</Header>
          <DurationInput
            label="Estimated Setup Time"
            value={editedEntry.setupSeconds}
            onChange={(value) => setEditedEntry({ ...scheduleEntry, setupSeconds: value })}
          />

          <Header className={styles.header}>OBS Scene Setup</Header>
          <OBSSceneSelector
            selectedSceneName={editedEntry.obsSceneName}
            note="Name of the scene to use for this run in OBS."
            onChange={(scene) => setEditedEntry({ ...scheduleEntry, obsSceneName: scene?.name })}
          />
        </div>

        <div className={styles.transitions}>
          <Header className={styles.header}>
            Enter Transition
            <Button
              className={styles.addTransitionButton}
              onClick={() => addTransition("enterTransitions")}>
              Add Transition
            </Button>
          </Header>
          {editedEntry.enterTransitions?.map((transition, index) => (
            <TransitionEditor
              key={transition.id}
              onMoveUp={() => reorderTransitions("enterTransitions", "up", index)}
              onMoveDown={() => reorderTransitions("enterTransitions", "down", index)}
              transition={transition}
              onChange={(transition) => updateTransition("enterTransitions", transition, index)}
              onRemove={() => removeTransition("enterTransitions", index)}
            />
          ))}
          <Header className={styles.header}>
            Exit Transition
            <Button
              className={styles.addTransitionButton}
              onClick={() => addTransition("exitTransitions")}>
              Add Transition
            </Button>
          </Header>
          {editedEntry.exitTransitions?.map((transition, index) => (
            <TransitionEditor
              key={transition.id}
              onMoveUp={() => reorderTransitions("exitTransitions", "up", index)}
              onMoveDown={() => reorderTransitions("exitTransitions", "down", index)}
              transition={transition}
              onChange={(transition) => updateTransition("exitTransitions", transition, index)}
              onRemove={() => removeTransition("exitTransitions", index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
