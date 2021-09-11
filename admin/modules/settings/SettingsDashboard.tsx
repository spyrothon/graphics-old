import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../dashboards/Dashboard";
import SETTINGS_ROUTES from "./SettingsRoutes";
import SettingsSidebar from "./SettingsSidebar";

import styles from "./SettingsDashboard.mod.css";

export default function SettingsDashboard() {
  function renderSidebar() {
    return <SettingsSidebar className={styles.sidebar} />;
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <Switch>
          {SETTINGS_ROUTES.map((item) => (
            <Route key={item.id} path={item.route} exact={item.exact} render={item.render} />
          ))}
        </Switch>
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={renderSidebar} renderMain={renderMain} />;
}
