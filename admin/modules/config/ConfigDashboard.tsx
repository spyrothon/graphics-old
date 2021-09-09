import * as React from "react";

import { useSafeSelector } from "../../Store";
import Dashboard from "../dashboards/Dashboard";
import * as ScheduleStore from "../schedules/ScheduleStore";
import ConfigOBSHost from "./ConfigOBSHost";
import ConfigStreamTemplates from "./ConfigStreamTemplates";

import styles from "./ConfigDashboard.mod.css";

export default function ConfigDashboard() {
  const { schedule } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
  }));

  function renderMain() {
    if (schedule == null) return null;

    return (
      <div className={styles.main}>
        <ConfigStreamTemplates schedule={schedule} />
        <ConfigOBSHost schedule={schedule} />
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={() => null} renderMain={renderMain} />;
}
