import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeProvider from "../graphics/uikit/ThemeProvider";
import { Routes } from "./Constants";
import { store } from "./Store";
import BlankPage from "./modules/router/BlankPage";
import LiveDashboard from "./modules/live/LiveDashboard";
import ScheduleEditor from "./modules/schedules/ScheduleEditor";

export default function Dashboards() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <ThemeProvider>
          <Router basename={Routes.BASE_PATH}>
            <Switch>
              <Route path={Routes.SCHEDULE_EDITOR} component={ScheduleEditor} />
              <Route path={Routes.LIVE_DASHBOARD} component={LiveDashboard} />
              <Route>
                <BlankPage />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </DndProvider>
  );
}
