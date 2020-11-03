import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Routes, MAIN_SCHEDULE_ID } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import Standard1 from "./layouts/standard/Standard1";
import Standard2 from "./layouts/standard/Standard2";
import { history } from "./modules/router/RouterUtils";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
// import RemoteActionReceiverManager from "./modules/remote/RemoteActionReceiverManager";
import SVGLibrary from "./uikit/svg/SVGLibrary";

export default function App() {
  // React.useEffect(() => {
  //   RemoteActionReceiverManager.init();
  //   return () => {
  //     RemoteActionReceiverManager.stop();
  //   };
  // }, []);

  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(fetchSchedule(MAIN_SCHEDULE_ID));
  }, []);

  return (
    <Router history={history}>
      <SVGLibrary />
      <Switch>
        <Route path={Routes.STANDARD_1} component={Standard1} />
        <Route path={Routes.STANDARD_2} component={Standard2} />
      </Switch>
    </Router>
  );
}
