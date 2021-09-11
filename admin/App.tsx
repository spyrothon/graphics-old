import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Routes } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import { loadSession } from "./modules/auth/AuthActions";
import AuthStore from "./modules/auth/AuthStore";
import AuthLogin from "./modules/auth/AuthLogin";
import AuthLogout from "./modules/auth/AuthLogout";
import BlankPage from "./modules/router/BlankPage";
import { history } from "./modules/router/RouterUtils";
import { fetchSchedule, fetchScheduleOBSConfig } from "./modules/schedules/ScheduleActions";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import Schedule from "./public/Schedule";
import Dashboards from "./Dashboards";
import { useSafeSelector } from "./Store";
import OBSManager from "./modules/obs/OBSManager";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import APIClient from "../api/APIClient";

export default function App() {
  const isLoggedIn = useSafeSelector((state) => AuthStore.isLoggedIn(state));
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    (async function () {
      const { scheduleId } = await APIClient.fetchInit();
      dispatch(fetchSchedule(scheduleId));
      dispatch(fetchScheduleOBSConfig(scheduleId));
      dispatch(loadSession());
    })();
  }, []);

  React.useEffect(() => {
    OBSManager.init();
    return () => {
      OBSManager.destroy();
    };
  }, []);

  if (schedule == null) return <div>Loading App</div>;

  return (
    <CurrentScheduleContext.Provider value={{ scheduleId: schedule.id, schedule }}>
      <Router history={history}>
        <Switch>
          <Route path={Routes.LOGIN} component={AuthLogin} />
          <Route path={Routes.LOGOUT} component={AuthLogout} />
          <Route path={Routes.SCHEDULE} component={Schedule} />
          <Route exact path={Routes.BASE_PATH} component={Schedule} />
          {isLoggedIn ? <Dashboards /> : null}
          <Route>
            <BlankPage />
          </Route>
        </Switch>
      </Router>
    </CurrentScheduleContext.Provider>
  );
}
