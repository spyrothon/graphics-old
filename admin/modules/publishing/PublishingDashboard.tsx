import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../dashboards/Dashboard";
import DashboardSidebar from "../dashboards/DashboardSidebar";
import PUBLISHING_ROUTES from "./PublishingRoutes";

import styles from "./PublishingDashboard.mod.css";

export default function NewslettersDashboard() {
  function renderSidebar() {
    return <DashboardSidebar className={styles.sidebar} routes={PUBLISHING_ROUTES} />;
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <Switch>
          {PUBLISHING_ROUTES.map((item) => (
            <Route key={item.id} path={item.route} exact={item.exact} render={item.render} />
          ))}
        </Switch>
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={renderSidebar} renderMain={renderMain} />;
}
