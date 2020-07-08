import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../../Store";
import RunSummary from "../../../uikit/RunSummary";
import { getActiveRunIds } from "../../runs/ActiveRunStore";
import { getHighlightedTeamId } from "../OmnibarStore";

import styles from "../Omnibar.mod.css";

export default function ActiveRunSummary() {
  const activeRunIds = useSafeSelector(getActiveRunIds);
  const highlightedTeamId = useSafeSelector(getHighlightedTeamId);

  return (
    <>
      {activeRunIds.map((runId, index) => (
        <RunSummary
          key={runId}
          runId={runId}
          midRow="team"
          className={classNames(styles.run, {
            [styles.bottomRowActive]: highlightedTeamId === index,
          })}
        />
      ))}
    </>
  );
}
