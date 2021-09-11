import * as React from "react";
import classNames from "classnames";

import NavLink from "../../uikit/NavLink";

import { Routes } from "../../Constants";

import styles from "./SettingsSidebar.mod.css";
import Button from "../../uikit/Button";
import SETTINGS_ROUTES from "./SettingsRoutes";

interface SettingsSidebarProps {
  className?: string;
}

export default function SettingsSidebar(props: SettingsSidebarProps) {
  const { className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      {SETTINGS_ROUTES.map((item) => (
        <NavLink
          exact
          key={item.id}
          className={styles.navItem}
          route={item.route}
          label={item.label}
          fullwidth
        />
      ))}
      <NavLink
        className={classNames(styles.navItem, styles.logout)}
        route={Routes.LOGOUT}
        label="Logout"
        color={Button.Colors.PRIMARY}
        look={Button.Looks.OUTLINED}
      />
    </div>
  );
}
