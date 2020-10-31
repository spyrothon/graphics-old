import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Routes, MAIN_SCHEDULE_ID } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import { loadSession } from "./modules/auth/AuthActions";
import AuthStore from "./modules/auth/AuthStore";
import AuthLogin from "./modules/auth/AuthLogin";
import AuthLogout from "./modules/auth/AuthLogout";
import BlankPage from "./modules/router/BlankPage";
import { history } from "./modules/router/RouterUtils";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import Schedule from "./public/Schedule";
import Dashboards from "./Dashboards";
import { useSafeSelector } from "./Store";

export default function App() {
  const isLoggedIn = useSafeSelector((state) => AuthStore.isLoggedIn(state));
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(fetchSchedule(MAIN_SCHEDULE_ID));
    dispatch(loadSession());
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route path={Routes.LOGIN} component={AuthLogin} />
        <Route path={Routes.LOGOUT} component={AuthLogout} />
        <Route path={Routes.SCHEDULE} component={Schedule} />
        {isLoggedIn ? <Dashboards /> : null}
        <Route>
          <BlankPage />
        </Route>
      </Switch>
    </Router>
  );
}
