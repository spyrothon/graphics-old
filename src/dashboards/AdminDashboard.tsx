import * as React from "react";

import RunList from "./modules/run-list/RunList";
import RunEditor from "./modules/run-editor/RunEditor";
import RunEditorContext, { useRunEditorState } from "./modules/run-editor/RunEditorContext";

import styles from "./AdminDashboard.mod.css";
import SidebarLayout from "./uikit/SidebarLayout";
import DashboardHeader from "./DashboardHeader";

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

  const editorState = useRunEditorState();

  return (
    <RunEditorContext.Provider value={editorState}>
      <SidebarLayout
        renderHeader={renderHeader}
        renderSidebar={renderSidebar}
        renderMain={renderMain}
      />
    </RunEditorContext.Provider>
  );
}
