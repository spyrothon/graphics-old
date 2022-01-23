import * as React from "react";

import Header from "@uikit/Header";
import NavLink from "@uikit/NavLink";
import Text from "@uikit/Text";
import { Routes } from "../../Constants";
import RemoteConnectionStatus from "../connection/RemoteConnectionStatus";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";

import styles from "./DashboardHeader.mod.css";

type DashboardHeaderProps = {
  name: React.ReactNode;
};

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { name } = props;
  const { schedule } = React.useContext(CurrentScheduleContext);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header size={Header.Sizes.H3} marginless>
          {name}
        </Header>
        <Text size={Text.Sizes.SIZE_14} marginless>
          {schedule.name}
        </Text>
      </div>
      <div className={styles.pages}>
        <NavLink route={Routes.SCHEDULE_EDITOR} label="Schedule Editor" />
        <NavLink route={Routes.LIVE_DASHBOARD} label="Live Dashboard" />
        <NavLink route={Routes.SETTINGS} label="Settings" />
        <NavLink route={Routes.PUBLISHING} label="Publishing" />
      </div>
      <div className={styles.right}>
        <RemoteConnectionStatus />
      </div>
    </div>
  );
}
