import * as React from "react";
import classNames from "classnames";

import NavLink from "../../uikit/NavLink";
import Text from "../../uikit/Text";

import { Routes } from "../../Constants";

import styles from "./SettingsSidebar.mod.css";
import Button from "../../uikit/Button";
import SETTINGS_ROUTES from "./SettingsRoutes";
import { useSafeSelector } from "../../Store";
import AuthStore from "../auth/AuthStore";

const ICON_STYLE = { marginRight: 8, marginBottom: -2.5 };

interface SettingsSidebarProps {
  className?: string;
}

export default function SettingsSidebar(props: SettingsSidebarProps) {
  const { className } = props;

  const token = useSafeSelector(AuthStore.getToken);

  return (
    <div className={classNames(styles.container, className)}>
      {SETTINGS_ROUTES.map(({ id, route, label, icon: Icon }) => (
        <NavLink
          exact
          key={id}
          className={styles.navItem}
          route={route}
          label={
            <>
              {Icon != null ? <Icon size={18} strokeWidth="2" style={ICON_STYLE} /> : null}
              {label}
            </>
          }
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
      <Text size={Text.Sizes.SIZE_12}>Logged in as {token?.userId}</Text>
    </div>
  );
}
