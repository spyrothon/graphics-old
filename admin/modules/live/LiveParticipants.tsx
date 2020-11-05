import * as React from "react";
import classNames from "classnames";

import type { Run } from "../../../api/APITypes";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import { persistRun } from "../runs/RunActions";

import styles from "./LiveParticipants.mod.css";

type LiveParticipantsProps = {
  run: Run;
  className?: string;
};

export default function LiveParticipants(props: LiveParticipantsProps) {
  const { run, className } = props;
  const dispatch = useSafeDispatch();

  const [runnerVisibilities, setRunnerVisibilities] = React.useState(() => {
    const runnerVisibilities: { [name: string]: boolean } = {};
    for (const runner of run.runners) {
      runnerVisibilities[runner.displayName] = runner.visible;
    }
    return runnerVisibilities;
  });

  const [commentatorVisibilities, setCommentatorVisibilities] = React.useState(() => {
    const commentatorVisibilities: { [name: string]: boolean } = {};
    for (const commentator of run.commentators) {
      commentatorVisibilities[commentator.displayName] = commentator.visible;
    }
    return commentatorVisibilities;
  });

  function setRunnerVisible(displayName: string, visible: boolean) {
    setRunnerVisibilities((state) => ({ ...state, [displayName]: visible }));
  }

  function setCommentatorVisible(displayName: string, visible: boolean) {
    setCommentatorVisibilities((state) => ({ ...state, [displayName]: visible }));
  }

  function handleSave() {
    dispatch(
      persistRun({
        ...run,
        runners: run.runners.map((runner) => ({
          ...runner,
          visible: runnerVisibilities[runner.displayName] ?? runner.visible,
        })),
        commentators: run.commentators.map((commentator) => ({
          ...commentator,
          visible: commentatorVisibilities[commentator.displayName] ?? commentator.visible,
        })),
      }),
    );
  }

  return (
    <div className={classNames(className)}>
      <Header size={Header.Sizes.H4}>Visibilities</Header>
      <Text>Toggle which participants should be shown on the Layout</Text>
      <div className={styles.columns}>
        <div className={styles.checkboxes}>
          {run.runners.map((runner) => (
            <div key={runner.displayName} className={styles.row}>
              <label>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={(event) => setRunnerVisible(runner.displayName, event.target.checked)}
                  checked={runnerVisibilities[runner.displayName] ?? runner.visible}
                />
                {runner.displayName}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.checkboxes}>
          {run.commentators.map((commentator) => (
            <div key={commentator.displayName} className={styles.row}>
              <label>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={(event) =>
                    setCommentatorVisible(commentator.displayName, event.target.checked)
                  }
                  checked={commentatorVisibilities[commentator.displayName] ?? commentator.visible}
                />
                {commentator.displayName}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSave}>Save Visibilities</Button>
    </div>
  );
}
