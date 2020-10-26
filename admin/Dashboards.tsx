import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Routes, MAIN_SCHEDULE_ID } from "./Constants";
import BlankPage from "./modules/router/BlankPage";
import LiveDashboard from "./modules/live/LiveDashboard";
import ScheduleEditor from "./modules/schedules/ScheduleEditor";
import useSafeDispatch from "./hooks/useDispatch";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";

export default function Dashboards() {
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(fetchSchedule(MAIN_SCHEDULE_ID));
  }, []);

  return (
    <Router basename={Routes.BASE_PATH}>
      <Switch>
        <Route path={Routes.SCHEDULE_EDITOR} component={ScheduleEditor} />
        <Route path={Routes.LIVE_DASHBOARD} component={LiveDashboard} />
        <Route>
          <BlankPage />
        </Route>
      </Switch>
    </Router>
  );
}
