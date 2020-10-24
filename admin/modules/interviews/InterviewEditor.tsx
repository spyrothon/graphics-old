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
import * as DurationUtils from "../time/DurationUtils";
import { persistInterview } from "./InterviewActions";
import * as InterviewStore from "./InterviewStore";
import useInterviewEditorState from "./useInterviewEditorState";

import styles from "./InterviewEditor.mod.css";

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
    dispatch(persistInterview(interview))
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

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <Button onClick={handleSave} disabled={saving || !editor.hasChanges()}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {getSaveText()}
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
