import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Routes, MAIN_SCHEDULE_ID } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import FiveFour1 from "./layouts/FiveFour1";
import GBA1 from "./layouts/GBA1";
import HD1 from "./layouts/hd/HD1";
import HD2 from "./layouts/hd/HD2";
import Standard1 from "./layouts/standard/Standard1";
import Standard2 from "./layouts/standard/Standard2";
import Standard4 from "./layouts/standard/Standard4";
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
        <Route path={Routes.STANDARD_4} component={Standard4} />

        <Route path={Routes.HD_1} component={HD1} />
        <Route path={Routes.HD_2} component={HD2} />

        <Route path={Routes.GBA_1} component={GBA1} />

        <Route path={Routes.FIVEFOUR_1} component={FiveFour1} />
      </Switch>
    </Router>
  );
}
