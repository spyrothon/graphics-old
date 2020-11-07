import * as React from "react";
import classNames from "classnames";

import { Interview, ScheduleEntry } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Anchor from "../../uikit/Anchor";
import Button from "../../uikit/Button";
import DurationInput from "../../uikit/DurationInput";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import TextInput from "../../uikit/TextInput";
import { updateScheduleEntry } from "../schedules/ScheduleActions";
import * as DurationUtils from "../time/DurationUtils";
import { persistInterview } from "./InterviewActions";
import * as InterviewStore from "./InterviewStore";
import useInterviewEditorState from "./useInterviewEditorState";

import styles from "./InterviewEditor.mod.css";
import NumberInput from "../../uikit/NumberInput";

type InterviewEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

export default function InterviewEditor(props: InterviewEditorProps) {
  const { scheduleEntry, className } = props;
  const { interviewId } = scheduleEntry;

  const dispatch = useSafeDispatch();
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  const editor = useInterviewEditorState();
  const [editedEntry, setEditedEntry] = React.useState(scheduleEntry);
  const hasEntryChanges = scheduleEntry.setupSeconds !== editedEntry.setupSeconds;

  React.useEffect(() => {
    setEditedEntry(scheduleEntry);
  }, [scheduleEntry]);

  React.useEffect(() => {
    editor.setBase(interview);
  }, [interview]);

  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [saveFailed, setSaveFailed] = React.useState(false);

  function handleSave() {
    const interview = editor.getEditedInterview();
    if (interview == null) return;

    setSaving(true);
    setSaveFailed(false);
    Promise.all([
      editor.hasChanges() ? dispatch(persistInterview(interview.id, interview)) : undefined,
      hasEntryChanges ? dispatch(updateScheduleEntry(editedEntry)) : undefined,
    ])
      .then(() => {
        setSaving(false);
        setSaveFailed(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      })
      .catch(() => {
        setSaving(false);
        setSaved(true);
        setSaveFailed(true);
      });
  }

  function getSaveText() {
    if (!saved) return null;

    if (saveFailed) {
      return (
        <Text className={styles.saveFailed} marginless>
          <strong>Failed to save the interview!</strong>
        </Text>
      );
    }

    return (
      <Text className={styles.saveSucceeded} marginless>
        <strong>Saved!</strong>
      </Text>
    );
  }

  function getNote<F extends keyof Interview>(field: F) {
    let originalValue: any = interview?.[field];
    const newValue = editor.getField(field);
    if (interview == null || originalValue == null || originalValue == newValue) return null;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return DurationUtils.toString(interview["estimateSeconds"]);
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

  function renderParticipantFields(type: "interviewers" | "interviewees", index: number) {
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

  function renderQuestionFields(index: number) {
    return (
      <div className={styles.question}>
        <TextInput
          className={styles.participantInput}
          label="Question"
          value={editor.getQuestionField(index, "question")}
          onChange={(event) => editor.updateQuestionField(index, "question", event.target.value)}
        />
        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={styles.participantInput}
            label="Category"
            value={editor.getQuestionField(index, "category")}
            onChange={(event) => editor.updateQuestionField(index, "category", event.target.value)}
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label="Hint"
            value={editor.getQuestionField(index, "hint")}
            onChange={(event) => editor.updateQuestionField(index, "hint", event.target.value)}
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label="Image"
            value={editor.getQuestionField(index, "image")}
            onChange={(event) => editor.updateQuestionField(index, "image", event.target.value)}
          />
        </div>

        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={styles.participantInput}
            label="Answer"
            value={editor.getQuestionField(index, "answer")}
            onChange={(event) => editor.updateQuestionField(index, "answer", event.target.value)}
          />
          <NumberInput
            marginless
            className={styles.participantInput}
            label="Score"
            pattern="\d+"
            value={editor.getQuestionField(index, "score")}
            onChange={(event) =>
              editor.updateQuestionField(index, "score", parseInt(event.target.value))
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <div className={styles.saveAction}>
          <Button
            onClick={handleSave}
            disabled={saving || (!editor.hasChanges() && !hasEntryChanges)}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {getSaveText()}
        </div>
        <div className={styles.entryFields}>
          <DurationInput
            label="Setup Time"
            value={editedEntry.setupSeconds}
            marginless
            onChange={(value) => setEditedEntry({ ...scheduleEntry, setupSeconds: value })}
          />
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.info}>
          <Header className={styles.header}>Interview Information</Header>
          <TextInput
            label="Topic"
            value={editor.getField("topic")}
            note={getNote("topic")}
            onChange={(event) => editor.updateField("topic", event.target.value)}
          />
          <DurationInput
            label="Estimated Time"
            value={editor.getField("estimateSeconds")}
            note={getNote("estimateSeconds")}
            onChange={(value) => editor.updateField("estimateSeconds", value)}
          />
          <TextInput
            label="Notes"
            value={editor.getField("notes")}
            note={getNote("notes")}
            onChange={(event) => editor.updateField("notes", event.target.value)}
            multiline
          />
          <Header className={styles.header}>Questions</Header>
          {renderQuestionFields(0)}
          {renderQuestionFields(1)}
          {renderQuestionFields(2)}
          {renderQuestionFields(3)}
          {renderQuestionFields(4)}
          {renderQuestionFields(5)}
        </div>
        <div className={styles.participants}>
          <Header className={styles.header}>Interviewer</Header>
          {renderParticipantFields("interviewers", 0)}
          <Header className={styles.header}>Interviewees</Header>
          {renderParticipantFields("interviewees", 0)}
          {renderParticipantFields("interviewees", 1)}
          {renderParticipantFields("interviewees", 2)}
          {renderParticipantFields("interviewees", 3)}
        </div>
      </div>
    </div>
  );
}
