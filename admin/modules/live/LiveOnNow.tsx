import * as React from "react";

import { RunParticipant } from "../../../api/APITypes";

import { useSafeSelector } from "../../Store";
import * as ScheduleStore from "../../modules/schedules/ScheduleStore";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import ScheduleListEntry from "../schedules/ScheduleListEntry";

import styles from "./LiveOnNow.mod.css";
import DurationUtils from "../time/DurationUtils";

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
        {sortedParticipants.map((participant) => (
          <li>
            <Text color={participant.visible ? Text.Colors.NORMAL : Text.Colors.MUTED}>
              {participant.displayName} {participant.visible ? null : `(hidden)`}
              {participant.actualSeconds
                ? ` - Done ${DurationUtils.toString(participant.actualSeconds)}`
                : null}{" "}
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
  const currentEntry = useSafeSelector((state) =>
    ScheduleStore.getCurrentEntryWithDependants(state),
  );

  if (currentEntry == null) return null;

  return (
    <div className={className}>
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
