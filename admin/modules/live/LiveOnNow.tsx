import * as React from "react";

import { RunParticipant } from "../../../api/APITypes";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import * as ScheduleStore from "../../modules/schedules/ScheduleStore";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import { updateSchedule, fetchScheduleOBSConfig } from "../schedules/ScheduleActions";
import ScheduleListEntry from "../schedules/ScheduleListEntry";
import DurationUtils from "../time/DurationUtils";

import styles from "./LiveOnNow.mod.css";

type ParticipantListProps = {
  name: string;
  participants: RunParticipant[];
};

function ParticipantList(props: ParticipantListProps) {
  const { name, participants } = props;

  const sortedParticipants = [...participants].sort((a, b) => (b.visible ? 1 : a.visible ? -1 : 0));

  return (
    <div className={styles.participantList}>
      <Header size={Header.Sizes.H5}>{name}</Header>
      <ul>
        {sortedParticipants.map((participant, index) => (
          <li key={index}>
            <Text color={participant.visible ? Text.Colors.NORMAL : Text.Colors.MUTED}>
              {participant.displayName} {participant.visible ? null : `(hidden)`}
              {participant.actualSeconds
                ? ` - Done ${DurationUtils.toString(participant.actualSeconds)}`
                : null}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

type LiveOnNowProps = {
  className?: string;
};

export default function LiveOnNow(props: LiveOnNowProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { currentEntry, schedule } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
  }));

  if (currentEntry == null) return null;

  function handleToggleDebug() {
    if (schedule == null) return;

    dispatch(updateSchedule({ ...schedule, debug: !schedule.debug }));
  }

  return (
    <div className={className}>
      <Button color={Button.Colors.DEFAULT} fullwidth onClick={handleToggleDebug}>
        {!schedule?.debug ? "Enable Debug Mode" : "Disable Debug Mode"}
      </Button>
      <Header size={Header.Sizes.H4}>On Now</Header>
      <div className={styles.currentEntry}>
        <ScheduleListEntry
          interactive={false}
          scheduleEntry={currentEntry}
          selected={false}
          onReorder={() => null}
        />
      </div>

      {currentEntry.run != null ? (
        <>
          <ParticipantList name="Runners" participants={currentEntry.run.runners} />
          <ParticipantList name="Commentators" participants={currentEntry.run.commentators} />
        </>
      ) : null}
    </div>
  );
}
