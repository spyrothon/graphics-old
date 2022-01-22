import * as React from "react";
import classNames from "classnames";
import { useDrag, useDrop } from "react-dnd";

import { RunParticipant, ScheduleEntry } from "@api/APITypes";
import useSafeDispatch from "@admin/hooks/useDispatch";
import * as DurationUtils from "@common/time/DurationUtils";
import Text from "@uikit/Text";
import { useSafeSelector } from "../../Store";
import * as InterviewStore from "../interviews/InterviewStore";
import * as RunStore from "../runs/RunStore";
import { removeScheduleEntry, selectScheduleEntry } from "./ScheduleActions";

import styles from "./ScheduleList.mod.css";

function renderNameList(participants: RunParticipant[]) {
  if (participants.length === 0) return null;

  return participants.map((participant) => participant.displayName).join(", ");
}

type RunEntryProps = {
  runId: string;
};

function RunEntry(props: RunEntryProps) {
  const { runId } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  if (run == null) return null;

  return (
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
        {DurationUtils.toString(run.estimateSeconds)} &middot; {run.categoryName}
      </Text>
      <Text size={Text.Sizes.SIZE_12} marginless oneline>
        {renderNameList(run.runners)}
      </Text>
    </div>
  );
}

type InterviewEntryProps = {
  interviewId: string;
};

function InterviewEntry(props: InterviewEntryProps) {
  const { interviewId } = props;
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  if (interview == null) return null;

  return (
    <div className={styles.runContent}>
      <Text marginless className={styles.runHeader} oneline>
        <strong>{interview.topic}</strong>
      </Text>
      <Text
        size={Text.Sizes.SIZE_12}
        color={Text.Colors.MUTED}
        marginless
        className={styles.category}
        oneline>
        {DurationUtils.toString(interview.estimateSeconds)}
      </Text>
      <Text size={Text.Sizes.SIZE_12} marginless oneline>
        {renderNameList(interview.interviewees)}
      </Text>
    </div>
  );
}

type ScheduleListEntryProps = {
  scheduleEntry: ScheduleEntry;
  selected: boolean;
  interactive?: boolean;
  onReorder: (entryId: string, newIndex: number) => unknown;
};

type DragItem = {
  type: "schedule-entry";
  entry: ScheduleEntry;
  height?: number;
};

export default function ScheduleListEntry(props: ScheduleListEntryProps) {
  const { scheduleEntry, selected, interactive = true, onReorder } = props;
  const { id: entryId, runId, interviewId, position, setupSeconds } = scheduleEntry;
  const dispatch = useSafeDispatch();

  const entryRef = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "schedule-entry", entry: scheduleEntry, height: 60 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isDropOver, draggedHeight }, drop] = useDrop({
    accept: "schedule-entry",
    drop: (item: DragItem) =>
      item.entry.position === position ? null : onReorder(item.entry.id, position),
    collect: (monitor) => ({
      isDropOver: monitor.isOver(),
      draggedHeight: monitor.getItem()?.entry.id === entryId ? 0 : monitor.getItem()?.height,
    }),
  });
  if (interactive) drag(drop(entryRef));

  function handleSelect() {
    dispatch(selectScheduleEntry(scheduleEntry.id));
  }

  async function handleDelete(event: React.SyntheticEvent<HTMLElement>) {
    if (!window.confirm(`Are you sure you want to delete this entry? #${position}`)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    await dispatch(removeScheduleEntry(scheduleEntry.scheduleId, scheduleEntry.id));
  }

  const setup =
    setupSeconds != null && setupSeconds > 0 ? (
      <Text className={styles.setup} size={Text.Sizes.SIZE_12} color={Text.Colors.MUTED} marginless>
        Setup: {DurationUtils.toString(setupSeconds)}
      </Text>
    ) : null;

  const content = (() => {
    if (runId != null) return <RunEntry runId={runId} />;
    if (interviewId != null) return <InterviewEntry interviewId={interviewId} />;
    return null;
  })();

  return (
    <div
      ref={entryRef}
      className={classNames(styles.entry, {
        [styles.selected]: selected,
        [styles.interactive]: interactive,
        [styles.dropOver]: isDropOver,
        [styles.dragging]: isDragging,
      })}
      onClick={handleSelect}>
      {isDropOver ? (
        <div className={styles.dropTarget} style={{ height: draggedHeight }}></div>
      ) : null}
      {setup}
      <div className={styles.content}>
        <Text className={styles.scheduleNumber} color={Text.Colors.MUTED} marginless>
          {position + 1}
        </Text>
        {content}
        {interactive ? (
          <div className={styles.removeAction} onClick={handleDelete}>
            &times;
          </div>
        ) : null}
      </div>
    </div>
  );
}
