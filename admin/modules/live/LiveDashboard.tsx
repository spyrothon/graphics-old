import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import ScheduleListEntry from "../schedules/ScheduleListEntry";
import { updateSchedule } from "../schedules/ScheduleActions";
import ScheduleEntrySelector from "../schedules/ScheduleEntrySelector";
import { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";

import styles from "./LiveDashboard.mod.css";

export default function LiveDashboard() {
  const dispatch = useSafeDispatch();
  const { schedule, entries, currentEntry } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    entries: ScheduleStore.getScheduleEntriesWithDependants(state),
    currentEntry: ScheduleStore.getCurrentEntry(state),
  }));

  function handleSetCurrentEntry(entry?: ScheduleEntryWithDependants) {
    if (schedule == null || entry == null) return;

    dispatch(updateSchedule({ ...schedule, currentEntryId: entry.id }));
  }

  return (
    <Dashboard
      fullPage
      renderSidebar={() => (
        <div className={styles.sidebar}>
          <Header>On Now</Header>
          {currentEntry != null ? (
            <ScheduleListEntry
              interactive={false}
              scheduleEntry={currentEntry}
              selected={false}
              onReorder={() => null}
            />
          ) : null}
        </div>
      )}
      renderMain={() => (
        <div className={styles.main}>
          <ScheduleEntrySelector
            label="Current Schedule Entry"
            entries={entries}
            selectedEntryId={currentEntry?.id}
            onChange={handleSetCurrentEntry}
          />
        </div>
      )}
    />
  );
}
