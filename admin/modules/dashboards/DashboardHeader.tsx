import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";

import Header from "../../uikit/Header";
import RemoteConnectionStatus from "../connection/RemoteConnectionStatus";

import styles from "./DashboardHeader.mod.css";
import { Routes } from "../../Constants";
import Button from "../../uikit/Button";

type NavLinkProps = {
  route: string;
  label: React.ReactNode;
};

function NavLink(props: NavLinkProps) {
  const { route, label } = props;

  const location = useLocation();
  const isActive = location.pathname === route;
  const history = useHistory();

  function handleClick() {
    if (isActive) return;

    history.push(route);
  }

  return (
    <Button onClick={handleClick} color={isActive ? Button.Colors.PRIMARY : Button.Colors.DEFAULT}>
      {label}
    </Button>
  );
}

type DashboardHeaderProps = {
  name: React.ReactNode;
};

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { name } = props;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header size={Header.Sizes.H2} marginless>
          {name}
        </Header>
      </div>
      <div className={styles.pages}>
        <NavLink route={Routes.SCHEDULE_EDITOR} label="Schedule Editor" />
        <NavLink route={Routes.LIVE_DASHBOARD} label="Live Dashboard" />
        <NavLink route={Routes.LOGOUT} label="Logout" />
      </div>
      <div className={styles.right}>
        <RemoteConnectionStatus />
      </div>
    </div>
  );
}
