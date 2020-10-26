import * as React from "react";

import { useSafeSelector } from "../../Store";
import Dashboard from "../dashboards/Dashboard";
import InterviewEditor from "../interviews/InterviewEditor";
import RunEditor from "../runs/RunEditor";
import ScheduleList from "../schedules/ScheduleList";
import * as ScheduleStore from "../schedules/ScheduleStore";

import styles from "./ScheduleEditor.mod.css";

export default function ScheduleEditor() {
  const selectedScheduleEntry = useSafeSelector((state) => ScheduleStore.getSelectedEntry(state));

  function renderSidebar() {
    return <ScheduleList className={styles.sidebar} />;
  }

  function renderMain() {
    if (selectedScheduleEntry?.runId != null)
      return <RunEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
    if (selectedScheduleEntry?.interviewId != null)
      return <InterviewEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
  }

  return <Dashboard fullPage renderSidebar={renderSidebar} renderMain={renderMain} />;
}
