import * as React from "react";

import { useSafeSelector } from "./Store";
import DashboardHeader from "./modules/dashboards/DashboardHeader";
import InterviewEditor from "./modules/interviews/InterviewEditor";
import RunEditor from "./modules/runs/RunEditor";
import ScheduleList from "./modules/schedules/ScheduleList";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import SidebarLayout from "./uikit/SidebarLayout";

import styles from "./AdminDashboard.mod.css";

export default function AdminDashboard() {
  const selectedScheduleEntry = useSafeSelector((state) => ScheduleStore.getSelectedEntry(state));

  function renderHeader() {
    return <DashboardHeader name="Graphics Dashboard" />;
  }

  function renderSidebar() {
    return <ScheduleList className={styles.sidebar} />;
  }

  function renderMain() {
    if (selectedScheduleEntry?.runId != null)
      return <RunEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
    if (selectedScheduleEntry?.interviewId != null)
      return <InterviewEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
  }

  return (
    <SidebarLayout
      renderHeader={renderHeader}
      renderSidebar={renderSidebar}
      renderMain={renderMain}
    />
  );
}
