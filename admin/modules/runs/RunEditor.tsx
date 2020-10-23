import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import TextInput, { TextInputType } from "../../uikit/TextInput";
import Button from "../../uikit/Button";
import { persistRun } from "./RunActions";
import * as RunStore from "./RunStore";
import useRunEditorState from "./useRunEditorState";

import styles from "./RunEditor.mod.css";
import DurationInput from "../../uikit/DurationInput";

type RunEditorProps = {
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { className } = props;

  const dispatch = useSafeDispatch();
  const currentRun = useSafeSelector(RunStore.getCurrentRun);
  const { setBaseRun, updateField, getField, getEditedRun } = useRunEditorState();

  React.useEffect(() => {
    setBaseRun(currentRun);
  }, [currentRun]);

  function handleSaveRun() {
    const run = getEditedRun();
    run != null && dispatch(persistRun(run));
  }

  return (
    <div className={className}>
      <TextInput
        label="Game Name"
        value={getField("gameName")}
        onChange={(event) => updateField("gameName", event.target.value)}
      />
      <TextInput
        label="Category Name"
        value={getField("categoryName")}
        onChange={(event) => updateField("categoryName", event.target.value)}
      />
      <div className={styles.inputRow}>
        <DurationInput
          label="Estimate"
          value={getField("estimateSeconds")}
          onChange={(value) => updateField("estimateSeconds", value)}
        />
        <TextInput
          label="Platform"
          value={getField("platform")}
          onChange={(event) => updateField("platform", event.target.value)}
        />
        <TextInput
          label="Release Year"
          value={getField("releaseYear")}
          pattern="\d\d\d\d"
          onChange={(event) => updateField("releaseYear", event.target.value)}
        />
      </div>
      <TextInput
        label="Notes"
        value={getField("notes")}
        onChange={(event) => updateField("notes", event.target.value)}
      />
      <Button onClick={handleSaveRun}>Save Changes</Button>

      <ul>{getField("runners")?.map((runner) => runner.displayName)}</ul>
    </div>
  );
}
