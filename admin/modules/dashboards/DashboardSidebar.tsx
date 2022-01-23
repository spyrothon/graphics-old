import * as React from "react";
import classNames from "classnames";
import { LogOut, Icon } from "react-feather";
import { RouteComponentProps } from "react-router";

import Button from "@uikit/Button";
import NavLink from "@uikit/NavLink";
import Text from "@uikit/Text";
import { Routes } from "../../Constants";
import { useSafeSelector } from "../../Store";
import AuthStore from "../auth/AuthStore";

import styles from "./DashboardSidebar.mod.css";

const ICON_STYLE = { marginRight: 8, marginBottom: -2.5 };

export interface DashboardSidebarRoute {
  id: string;
  icon?: Icon;
  label: React.ReactNode;
  route: string;
  exact?: boolean;
  showLink?: boolean;
  render: (props: RouteComponentProps<any>) => React.ReactNode;
}

interface DashboardSidebarProps {
  routes: DashboardSidebarRoute[];
  className?: string;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const { routes, className } = props;

  const currentUser = useSafeSelector(AuthStore.getUser);

  return (
    <div className={classNames(styles.container, className)}>
      {routes.map(({ id, route, label, icon: Icon, showLink = true }) =>
        showLink ? (
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
        ) : null,
      )}
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
