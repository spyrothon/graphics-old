import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import { fetchSchedule, selectScheduleEntry } from "./ScheduleActions";
import ScheduleListEntry from "./ScheduleListEntry";
import * as ScheduleStore from "./ScheduleStore";

import styles from "./ScheduleList.mod.css";
import AddEntryButton from "./AddEntryButton";

const MAIN_SCHEDULE_ID = "1";

type RunListProps = {
  className?: string;
};

export default function ScheduleList(props: RunListProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { isFetching, scheduleEntries, selectedEntryId } = useSafeSelector((state) => ({
    isFetching: ScheduleStore.isFetchingSchedule(state),
    scheduleEntries: ScheduleStore.getScheduleEntries(state),
    selectedEntryId: ScheduleStore.getSelectedEntryId(state),
  }));

  React.useEffect(() => {
    dispatch(fetchSchedule(MAIN_SCHEDULE_ID));
  }, []);

  // Auto-select the first run when the runs are first loaded
  React.useEffect(() => {
    if (isFetching) return;

    const firstRun = scheduleEntries.find((entry) => entry.runId != null);
    if (firstRun == null) return;

    dispatch(selectScheduleEntry(firstRun.id));
    // Only want this to run immediately after the runs have loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <div className={className}>
      {isFetching ? (
        <Text className={styles.fetching}>Fetching Schedule</Text>
      ) : (
        scheduleEntries.map((entry) => (
          <ScheduleListEntry
            key={entry.id}
            scheduleEntry={entry}
            selected={entry.id === selectedEntryId}
          />
        ))
      )}
      <AddEntryButton scheduleId={MAIN_SCHEDULE_ID} />
    </div>
  );
}
