import * as React from "react";

import { RunParticipant } from "../../../api/APITypes";
import TextInput from "../../uikit/TextInput";
import { RunEditorStateValue } from "./useRunEditorState";

import styles from "./RunEditor.mod.css";

type RunnerEditorProps = {
  editor: RunEditorStateValue;
  runner: RunParticipant;
};

export default function RunnerEditor(props: RunnerEditorProps) {
  const { runner, editor } = props;

  return (
    <div className={styles.runner}>
      <TextInput
        label="Game Name"
        value={runner.displayName}
        note={getNote("gameName")}
        onChange={(event) => updateField("runners")}
      />
    </div>
  );
}
