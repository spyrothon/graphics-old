import * as React from "react";

import DashboardHeader from "../dashboards/DashboardHeader";
import SidebarLayout from "@uikit/SidebarLayout";

type DashboardProps = {
  fullPage?: boolean;
  renderSidebar?: () => React.ReactNode;
  renderMain?: () => React.ReactNode;
  children?: React.ReactNode;
};

export default function Dashboard(props: DashboardProps) {
  return (
    <SidebarLayout
      fullPage={props.fullPage}
      renderHeader={() => <DashboardHeader name="Graphics Dashboard" />}
      renderSidebar={props.renderSidebar}
      renderMain={props.children ? () => props.children : props.renderMain ?? (() => null)}
    />
  );
}
