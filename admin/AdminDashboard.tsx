import * as React from "react";

import DashboardHeader from "./modules/dashboards/DashboardHeader";
import RunList from "./modules/runs/RunList";
import RunEditor from "./modules/runs/RunEditor";
import SidebarLayout from "./uikit/SidebarLayout";

import styles from "./AdminDashboard.mod.css";

export default function AdminDashboard() {
  function renderHeader() {
    return <DashboardHeader name="Graphics Dashboard" />;
  }

  function renderSidebar() {
    return <RunList className={styles.sidebar} />;
  }

  function renderMain() {
    return <RunEditor className={styles.main} />;
  }

  return (
    <SidebarLayout
      renderHeader={renderHeader}
      renderSidebar={renderSidebar}
      renderMain={renderMain}
    />
  );
}
