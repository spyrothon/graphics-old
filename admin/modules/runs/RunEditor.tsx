import * as React from "react";
import classNames from "classnames";

import { Run, ScheduleEntry } from "@api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import useSaveable, { SaveState } from "@common/hooks/useSaveable";
import * as DurationUtils from "@common/time/DurationUtils";
import Anchor from "@uikit/Anchor";
import Button from "@uikit/Button";
import DurationInput from "@uikit/DurationInput";
import Header from "@uikit/Header";
import TextInput from "@uikit/TextInput";
import { persistRun } from "./RunActions";
import * as RunStore from "./RunStore";
import useRunEditorState from "./useRunEditorState";

import styles from "./RunEditor.mod.css";

type RunEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { scheduleEntry, className } = props;
  const { runId } = scheduleEntry;

  const dispatch = useSafeDispatch();
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const editor = useRunEditorState();

  React.useEffect(() => {
    editor.setBaseRun(run);
  }, [run]);

  const [handleSaveRun, getSaveText, saveState] = useSaveable(async () =>
    dispatch(persistRun(run.id, editor.getEditedRun())),
  );

  function getNote<F extends keyof Run>(field: F, additional?: string) {
    const originalValue: any = run?.[field];
    const newValue = editor.getField(field);
    if (run == null || originalValue == null || originalValue === newValue) return additional;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return DurationUtils.toString(run.estimateSeconds);
        case "notes":
          return "original";
        default:
          return <>&ldquo;{originalValue}&rdquo;</>;
      }
    };

    return (
      <>
        {additional}{" "}
        <Anchor onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
          Reset to {renderValue()}.
        </Anchor>
      </>
    );
  }

  function renderParticipantFields(type: "runners" | "commentators", index: number) {
    return (
      <div className={styles.runner}>
        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Display Name" : undefined}
            value={editor.getParticipantField(type, index, "displayName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "displayName", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Twitch" : undefined}
            value={editor.getParticipantField(type, index, "twitchName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "twitchName", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Twitter" : undefined}
            value={editor.getParticipantField(type, index, "twitterName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "twitterName", event.target.value)
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.editor}>
        <div className={styles.runInfo}>
          <Header className={styles.header}>
            Run Information
            <Button
              className={styles.saveButton}
              onClick={handleSaveRun}
              disabled={saveState === SaveState.SAVING || !editor.hasChanges()}>
              {getSaveText()}
            </Button>
          </Header>
          <TextInput
            label="Game Name"
            value={editor.getField("gameName")}
            note={getNote("gameName", "This must exactly match the game's name on Twitch.")}
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
            multiline
            onChange={(event) => editor.updateField("notes", event.target.value)}
          />
          <Header className={styles.header}>Layout Information</Header>
          <TextInput
            label="Formatted Game Name"
            note="Use newlines to adjust how the game name looks on stream."
            value={editor.getField("gameNameFormatted")}
            multiline
            // @ts-expect-error TextInput needs to handle textarea props
            rows={2}
            onChange={(event) => editor.updateField("gameNameFormatted", event.target.value)}
          />
        </div>

        <div className={styles.participants}>
          <Header className={styles.header}>Runners</Header>
          {renderParticipantFields("runners", 0)}
          {renderParticipantFields("runners", 1)}
          {renderParticipantFields("runners", 2)}
          {renderParticipantFields("runners", 3)}
          {renderParticipantFields("runners", 4)}
          {renderParticipantFields("runners", 5)}
          {renderParticipantFields("runners", 6)}
          {renderParticipantFields("runners", 7)}
          {renderParticipantFields("runners", 8)}
          <Header className={styles.header}>Commentators</Header>
          {renderParticipantFields("commentators", 0)}
          {renderParticipantFields("commentators", 1)}
          {renderParticipantFields("commentators", 2)}
          {renderParticipantFields("commentators", 3)}
        </div>
      </div>
    </div>
  );
}
