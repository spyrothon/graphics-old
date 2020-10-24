import * as React from "react";
import classNames from "classnames";

import Button from "../../uikit/Button";
import Text from "../../uikit/Text";
import TextInput from "../../uikit/TextInput";

import styles from "./InterviewEditor.mod.css";
import Header from "../../uikit/Header";

type RunEditorProps = {
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { className } = props;

  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [saveFailed, setSaveFailed] = React.useState(false);

  function handleSaveRun() {
    setSaving(true);
    setSaveFailed(false);
    Promise.resolve()
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
          <strong>Failed to save the run!</strong>
        </Text>
      );
    }

    return (
      <Text className={styles.saveSucceeded} marginless>
        <strong>Saved!</strong>
      </Text>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <Button onClick={handleSaveRun} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {getSaveText()}
      </div>
      <div className={styles.editor}>
        <div>
          <Header>Interview Information</Header>
          <TextInput label="Interview Name" defaultValue="" marginless />
        </div>
      </div>
    </div>
  );
}
