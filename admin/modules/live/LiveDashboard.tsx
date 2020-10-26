import * as React from "react";
import Dashboard from "../dashboards/Dashboard";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import { useSafeSelector } from "../../Store";
import * as ScheduleStore from "../schedules/ScheduleStore";
import ScheduleListEntry from "../schedules/ScheduleListEntry";

export default function LiveDashboard() {
  const { entries, currentEntry } = useSafeSelector((state) => ({
    entries: ScheduleStore.getScheduleEntries(state),
    currentEntry: ScheduleStore.getCurrentEntry(state),
  }));

  console.log(currentEntry);

  return (
    <Dashboard>
      <Header>Live Dashboard</Header>
      <Text>On Now</Text>
      {currentEntry != null ? (
        <ScheduleListEntry scheduleEntry={currentEntry} selected={false} onReorder={() => null} />
      ) : null}
    </Dashboard>
  );
}
