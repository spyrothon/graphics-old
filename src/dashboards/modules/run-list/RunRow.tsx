import * as React from "react";
import classNames from "classnames";

import { RunInfo, RunParticipant } from "../../../modules/run-info/RunInfoTypes";
import Text from "../../uikit/Text";

import styles from "./RunList.mod.css";

function renderNameList(participants: RunParticipant[]) {
  if (participants.length === 0) return "None";

  return participants
    .map((participant) => participant.displayName ?? `#${participant.userId}`)
    .join(", ");
}

type RunRowProps = {
  run: RunInfo;
  index?: number;
  selected?: boolean;
  onClick: () => unknown;
};

export default function RunRow(props: RunRowProps) {
  const { run, index, selected = false, onClick } = props;

  return (
    <div
      className={classNames(styles.run, { [styles.selected]: selected })}
      key={run.id}
      onClick={onClick}>
      <Text className={styles.scheduleNumber} color={Text.Colors.MUTED} marginless>
        #{index}
      </Text>
      <div className={styles.runContent}>
        <Text marginless className={styles.runHeader} oneline>
          <strong>{run.gameName}</strong>
        </Text>
        <Text
          size={Text.Sizes.SIZE_12}
          color={Text.Colors.MUTED}
          marginless
          className={styles.category}
          oneline>
          {run.categoryName}
        </Text>
        <Text size={Text.Sizes.SIZE_12} marginless>
          Runners: {renderNameList(run.runners)} &mdash; Commentators:{" "}
          {renderNameList(run.commentators)}
        </Text>
      </div>
    </div>
  );
}
