import * as React from "react";
import classNames from "classnames";

import { RunParticipant, ScheduleEntry } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import * as RunStore from "../runs/RunStore";

import styles from "./ScheduleList.mod.css";
import { selectScheduleEntry } from "./ScheduleActions";

type RunEntryProps = {
  runId: string;
  position: number;
  selected: boolean;
  onClick: () => unknown;
};

function RunEntry(props: RunEntryProps) {
  const { runId, position, selected, onClick } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));

  if (run == null) return null;

  function renderNameList(participants: RunParticipant[]) {
    if (participants.length === 0) return "None";

    return participants.map((participant) => participant.displayName).join(", ");
  }

  return (
    <div className={classNames(styles.entry, { [styles.selected]: selected })} onClick={onClick}>
      <Text className={styles.scheduleNumber} color={Text.Colors.MUTED} marginless>
        #{position}
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
          {renderNameList(run.runners)}, with {renderNameList(run.commentators)}
        </Text>
      </div>
    </div>
  );
}

type InterviewEntryProps = {
  position: number;
  selected: boolean;
  onClick: () => unknown;
};

function InterviewEntry(props: InterviewEntryProps) {
  const { position, selected, onClick } = props;

  return (
    <div className={classNames(styles.entry, { [styles.selected]: selected })} onClick={onClick}>
      <Text className={styles.scheduleNumber} color={Text.Colors.MUTED} marginless>
        #{position}
      </Text>
      <div className={styles.runContent}>
        <Text marginless className={styles.runHeader} oneline>
          <strong>INTERVIEW</strong>
        </Text>
      </div>
    </div>
  );
}

type ScheduleListEntryProps = {
  scheduleEntry: ScheduleEntry;
  selected: boolean;
};

export default function ScheduleListEntry(props: ScheduleListEntryProps) {
  const { scheduleEntry, selected } = props;
  const { runId, position } = scheduleEntry;

  const dispatch = useSafeDispatch();

  function handleSelect() {
    dispatch(selectScheduleEntry(scheduleEntry.id));
  }

  if (runId != null) {
    return (
      <RunEntry runId={runId} position={position} selected={selected} onClick={handleSelect} />
    );
  } else {
    return <InterviewEntry position={position} selected={selected} onClick={handleSelect} />;
  }

  return <div></div>;
}
