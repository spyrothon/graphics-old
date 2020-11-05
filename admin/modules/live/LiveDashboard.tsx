import * as React from "react";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import ScheduleListEntry from "../schedules/ScheduleListEntry";
import { updateSchedule } from "../schedules/ScheduleActions";
import ScheduleEntrySelector from "../schedules/ScheduleEntrySelector";
import { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";

import styles from "./LiveDashboard.mod.css";
import DurationInput from "../../uikit/DurationInput";

export default function LiveDashboard() {
  const dispatch = useSafeDispatch();
  const { schedule, entries, currentEntry } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    entries: ScheduleStore.getScheduleEntriesWithDependants(state),
    currentEntry: ScheduleStore.getCurrentEntry(state),
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
        <ScheduleEntrySelector
          label="Current Schedule Entry"
          entries={entries}
          selectedEntryId={selectedEntry?.id}
          onChange={setSelectedEntry}
        />
        <Button onClick={handleSetCurrentEntry}>Make this the Current Entry</Button>
        <DurationInput
          label="Actual Setup Time"
          value={selectedEntry?.setupSeconds}
          onChange={(value) =>
            selectedEntry != null
              ? setSelectedEntry({ ...selectedEntry, setupSeconds: value })
              : undefined
          }
        />
        <DurationInput
          label="Actual Run Time"
          value={selectedEntry?.setupSeconds}
          onChange={(value) =>
            selectedEntry != null
              ? setSelectedEntry({ ...selectedEntry, setupSeconds: value })
              : undefined
          }
        />
      </div>
    );
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
      renderMain={renderMain}
    />
  );
}
