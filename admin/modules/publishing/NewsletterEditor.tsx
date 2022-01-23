import * as React from "react";
import classNames from "classnames";

import { Newsletter } from "@api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import useSaveable, { SaveState } from "@common/hooks/useSaveable";
import Anchor from "@uikit/Anchor";
import Button from "@uikit/Button";
import Header from "@uikit/Header";
import TextInput from "@uikit/TextInput";
import { createNewsletter, persistNewsletter } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";
import useNewsletterEditorState from "./useNewsletterEditorState";

import styles from "./NewsletterEditor.mod.css";

type NewsletterEditorProps = {
  newsletterId?: string;
  className?: string;
};

export default function NewsletterEditor(props: NewsletterEditorProps) {
  const { newsletterId, className } = props;

  const dispatch = useSafeDispatch();
  const newsletter = useSafeSelector((state) =>
    newsletterId != null ? PublishingStore.getNewsletter(state, { newsletterId }) : undefined,
  );
  const editor = useNewsletterEditorState();

  React.useEffect(() => {
    editor.setBaseNewsletter(newsletter);
  }, [newsletter]);

  const [handleSaveNewsletter, getSaveText, saveState] = useSaveable(async () => {
    if (newsletterId != null) {
      dispatch(persistNewsletter(newsletterId, editor.getEditedNewsletter()));
    } else {
      dispatch(createNewsletter(editor.getEditedNewsletter()));
    }
  });

  function getNote<F extends keyof Newsletter>(field: F, additional?: string) {
    const originalValue: any = newsletter?.[field];
    const newValue = editor.getField(field);
    if (newsletter == null || originalValue == null || originalValue === newValue) {
      return additional;
    }

    const renderValue = () => {
      switch (field) {
        case "content":
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

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.editor}>
        <Header className={styles.header}>
          <Button
            className={styles.saveButton}
            onClick={handleSaveNewsletter}
            disabled={saveState === SaveState.SAVING || !editor.hasChanges()}>
            {getSaveText()}
          </Button>
        </Header>
        <TextInput
          label="Title"
          value={editor.getField("title")}
          note={getNote("title")}
          onChange={(event) => editor.updateField("title", event.target.value)}
        />
        <TextInput
          label="Introduction"
          multiline
          rows={12}
          value={editor.getField("introduction")}
          note={getNote("introduction")}
          onChange={(event) => editor.updateField("introduction", event.target.value)}
        />
      </div>
    </div>
  );
}
