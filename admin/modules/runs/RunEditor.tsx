import * as React from "react";
import classNames from "classnames";

import { Run, RunParticipant } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Anchor from "../../uikit/Anchor";
import Button from "../../uikit/Button";
import DurationInput from "../../uikit/DurationInput";
import TextInput from "../../uikit/TextInput";
import * as DurationUtils from "../time/DurationUtils";
import { persistRun } from "./RunActions";
import * as RunStore from "./RunStore";
import useRunEditorState from "./useRunEditorState";

import styles from "./RunEditor.mod.css";
import Header from "../../uikit/Header";

type RunEditorProps = {
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { className } = props;

  const dispatch = useSafeDispatch();
  const currentRun = useSafeSelector(RunStore.getCurrentRun);
  const editor = useRunEditorState();

  React.useEffect(() => {
    editor.setBaseRun(currentRun);
  }, [currentRun]);

  function handleSaveRun() {
    const run = editor.getEditedRun();
    run != null && dispatch(persistRun(run));
  }

  function getNote<F extends keyof Run>(field: F) {
    let originalValue: any = currentRun?.[field];
    const newValue = editor.getField(field);
    if (currentRun == null || originalValue == null || originalValue == newValue) return null;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return DurationUtils.toString(currentRun["estimateSeconds"]);
        case "notes":
          return "original";
        default:
          return <>&ldquo;{originalValue}&rdquo;</>;
      }
    };

    return (
      <Anchor onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
        Reset to {renderValue()}.
      </Anchor>
    );
  }

  function renderRunnerFields(index: number) {
    return (
      <div className={styles.runner}>
        <Header size={Header.Sizes.H4} marginless>
          Runner {index + 1}
        </Header>
        <div className={styles.inputRow}>
          <TextInput
            label="Display Name"
            value={editor.getRunnerField(index, "displayName")}
            onChange={(event) => editor.updateRunnerField(index, "displayName", event.target.value)}
          />
          <TextInput
            label="Twitch"
            value={editor.getRunnerField(index, "twitchName")}
            onChange={(event) => editor.updateRunnerField(index, "twitchName", event.target.value)}
          />
          <TextInput
            label="Twitter"
            value={editor.getRunnerField(index, "twitterName")}
            onChange={(event) => editor.updateRunnerField(index, "twitterName", event.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <Button onClick={handleSaveRun} disabled={!editor.hasChanges()}>
          Save Changes
        </Button>
      </div>
      <div className={styles.editor}>
        <div className={styles.runInfo}>
          <Header>Run Information</Header>
          <TextInput
            label="Game Name"
            value={editor.getField("gameName")}
            note={getNote("gameName")}
            onChange={(event) => editor.updateField("gameName", event.target.value)}
          />
          <TextInput
            label="Category Name"
            value={editor.getField("categoryName")}
            note={getNote("categoryName")}
            onChange={(event) => editor.updateField("categoryName", event.target.value)}
          />
          <div className={styles.inputRow}>
            <DurationInput
              label="Estimate"
              value={editor.getField("estimateSeconds")}
              note={getNote("estimateSeconds")}
              onChange={(value) => editor.updateField("estimateSeconds", value)}
            />
            <TextInput
              label="Platform"
              value={editor.getField("platform")}
              note={getNote("platform")}
              onChange={(event) => editor.updateField("platform", event.target.value)}
            />
            <TextInput
              label="Release Year"
              value={editor.getField("releaseYear")}
              note={getNote("releaseYear")}
              pattern="\d\d\d\d"
              onChange={(event) => editor.updateField("releaseYear", event.target.value)}
            />
          </div>
          <TextInput
            label="Notes"
            value={editor.getField("notes")}
            note={getNote("notes")}
            onChange={(event) => editor.updateField("notes", event.target.value)}
          />
        </div>

        <div className={styles.runners}>
          <Header>Runners</Header>
          {renderRunnerFields(0)}
          {renderRunnerFields(1)}
          {renderRunnerFields(2)}
          {renderRunnerFields(3)}
        </div>
      </div>
    </div>
  );
}
