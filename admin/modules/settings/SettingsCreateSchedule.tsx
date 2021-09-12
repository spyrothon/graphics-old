import * as React from "react";

import Header from "../../uikit/Header";
import NewScheduleForm from "../schedules/NewScheduleForm";

import styles from "./SettingsDashboard.mod.css";

export default function SettingsGeneral() {
  return (
    <div className={styles.section}>
      <Header size={Header.Sizes.H2}>Create a New Schedule</Header>
      <NewScheduleForm />
    </div>
  );
}
