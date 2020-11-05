import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import ScheduleListEntry from "../schedules/ScheduleListEntry";
import { updateSchedule } from "../schedules/ScheduleActions";
import ScheduleEntrySelector from "../schedules/ScheduleEntrySelector";
import { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";
import LiveParticipants from "./LiveParticipants";
import LiveRunActuals from "./LiveRunActuals";
import LiveRunInfo from "./LiveRunInfo";

import styles from "./LiveDashboard.mod.css";
import LiveOnNow from "./LiveOnNow";

export default function LiveDashboard() {
  const dispatch = useSafeDispatch();
  const { schedule, entries, currentEntry } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    entries: ScheduleStore.getScheduleEntriesWithDependants(state),
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
  }));

  const [selectedEntry, setSelectedEntry] = React.useState<ScheduleEntryWithDependants | undefined>(
    currentEntry,
  );

  function handleSetCurrentEntry() {
    if (schedule == null || selectedEntry == null) return;

    dispatch(updateSchedule({ ...schedule, currentEntryId: selectedEntry.id }));
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <div className={styles.entrySelector}>
          <ScheduleEntrySelector
            label="Current Schedule Entry"
            entries={entries}
            selectedEntryId={selectedEntry?.id}
            onChange={setSelectedEntry}
          />
          <Button className={styles.setCurrentButton} onClick={handleSetCurrentEntry}>
            Make this the Current Entry
          </Button>
        </div>
        {selectedEntry?.run != null ? (
          <div className={styles.panels}>
            <LiveRunInfo run={selectedEntry.run} />
            <LiveRunActuals
              className={styles.actuals}
              entry={selectedEntry}
              run={selectedEntry.run}
            />
            <LiveParticipants run={selectedEntry.run} />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Dashboard
      fullPage
      renderSidebar={() => <LiveOnNow className={styles.sidebar} />}
      renderMain={renderMain}
    />
  );
}
