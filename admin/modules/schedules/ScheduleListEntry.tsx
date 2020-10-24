import * as React from "react";
import classNames from "classnames";

import { RunParticipant, ScheduleEntry } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import * as InterviewStore from "../interviews/InterviewStore";
import * as RunStore from "../runs/RunStore";
import * as DurationUtils from "../time/DurationUtils";

import styles from "./ScheduleList.mod.css";
import { selectScheduleEntry } from "./ScheduleActions";

type RunEntryProps = {
  runId: string;
  position: number;
};

function RunEntry(props: RunEntryProps) {
  const { runId, position } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  if (run == null) return null;

  function renderNameList(participants: RunParticipant[]) {
    if (participants.length === 0) return "None";

    return participants.map((participant) => participant.displayName).join(", ");
  }

  return (
    <div className={styles.content}>
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
  interviewId: string;
  position: number;
};

function InterviewEntry(props: InterviewEntryProps) {
  const { interviewId, position } = props;
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  if (interview == null) return null;

  return (
    <div className={styles.content}>
      <Text className={styles.scheduleNumber} color={Text.Colors.MUTED} marginless>
        #{position}
      </Text>
      <div className={styles.runContent}>
        <Text marginless className={styles.runHeader} oneline>
          <strong>Interview</strong>
        </Text>
        <Text
          size={Text.Sizes.SIZE_12}
          color={Text.Colors.MUTED}
          marginless
          className={styles.category}
          oneline>
          {interview.topic}
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
  const { runId, interviewId, position, setupSeconds } = scheduleEntry;

  const dispatch = useSafeDispatch();

  function handleSelect() {
    dispatch(selectScheduleEntry(scheduleEntry.id));
  }

  const setup =
    setupSeconds != null && setupSeconds > 0 ? (
      <Text className={styles.setup} size={Text.Sizes.SIZE_12} color={Text.Colors.MUTED} marginless>
        Setup: {DurationUtils.toString(setupSeconds)}
      </Text>
    ) : null;

  const content = (() => {
    if (runId != null) return <RunEntry runId={runId} position={position} />;
    if (interviewId != null)
      return <InterviewEntry interviewId={interviewId} position={position} />;
    return null;
  })();

  return (
    <div
      className={classNames(styles.entry, { [styles.selected]: selected })}
      onClick={handleSelect}>
      {setup}
      {content}
    </div>
  );
}
