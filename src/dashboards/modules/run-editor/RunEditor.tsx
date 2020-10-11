import * as React from "react";

import TextInput from "../../uikit/TextInput";
import Button from "../../uikit/Button";
import RunEditorContext from "./RunEditorContext";

import styles from "./RunEditor.mod.css";
import { saveRun } from "./RunEditorActions";
import useSafeDispatch from "../../../hooks/useDispatch";

type RunEditorProps = {
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { className } = props;

  const dispatch = useSafeDispatch();
  const { updateField, getField, getEditedRun } = React.useContext(RunEditorContext);

  function handleSaveRun() {
    const run = getEditedRun();
    run != null && dispatch(saveRun(run));
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
        <TextInput
          label="Estimate"
          value={`${getField("estimateSeconds")}`}
          onChange={(event) => updateField("estimateSeconds", parseInt(event.target.value))}
        />
        <TextInput
          label="Platform"
          value={getField("platform")}
          onChange={(event) => updateField("platform", event.target.value)}
        />
        <TextInput
          label="Release Year"
          value={getField("releaseYear")}
          onChange={(event) => updateField("releaseYear", event.target.value)}
        />
      </div>
      <TextInput
        label="Notes"
        value={getField("notes")}
        onChange={(event) => updateField("notes", event.target.value)}
      />
      <Button onClick={handleSaveRun}>Update Current Run</Button>

      <ul>{getField("runners")?.map((runner) => runner.displayName)}</ul>
    </div>
  );
}
