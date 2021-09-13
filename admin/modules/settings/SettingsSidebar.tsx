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
import { LogOut } from "react-feather";

const ICON_STYLE = { marginRight: 8, marginBottom: -2.5 };

interface SettingsSidebarProps {
  className?: string;
}

export default function SettingsSidebar(props: SettingsSidebarProps) {
  const { className } = props;

  const currentUser = useSafeSelector(AuthStore.getUser);

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
        label={
          <>
            <LogOut size={18} strokeWidth="2" style={ICON_STYLE} />
            Logout
          </>
        }
        color={Button.Colors.PRIMARY}
        look={Button.Looks.OUTLINED}
      />
      <Text size={Text.Sizes.SIZE_12}>
        Logged in as <strong>{currentUser?.name}</strong>
      </Text>
    </div>
  );
}
