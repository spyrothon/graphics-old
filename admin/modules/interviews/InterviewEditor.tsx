import * as React from "react";
import classNames from "classnames";

import { Interview } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Anchor from "../../uikit/Anchor";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import TextInput from "../../uikit/TextInput";
import { persistInterview } from "./InterviewActions";
import * as InterviewStore from "./InterviewStore";
import useInterviewEditorState from "./useInterviewEditorState";

import styles from "./InterviewEditor.mod.css";

type InterviewEditorProps = {
  interviewId: string;
  className?: string;
};

export default function InterviewEditor(props: InterviewEditorProps) {
  const { interviewId, className } = props;

  const dispatch = useSafeDispatch();
  const interview: Interview | undefined = useSafeSelector((state) =>
    InterviewStore.getInterview(state, { interviewId }),
  );
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

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <Button onClick={handleSave} disabled={saving || !editor.hasChanges()}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {getSaveText()}
      </div>
      <div className={styles.editor}>
        <div>
          <Header>Interview Information</Header>
          <TextInput
            label="Topic"
            value={editor.getField("topic")}
            note={getNote("topic")}
            onChange={(event) => editor.updateField("topic", event.target.value)}
          />
          <TextInput
            label="Notes"
            value={editor.getField("notes")}
            note={getNote("notes")}
            onChange={(event) => editor.updateField("notes", event.target.value)}
            multiline
          />
        </div>
      </div>
    </div>
  );
}
