import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import APIClient from "@api/APIClient";
import useSafeDispatch from "@admin/hooks/useDispatch";
import BlankPage from "@common/router/BlankPage";
import { history } from "@common/router/RouterUtils";
import { Routes } from "./Constants";
import Newsletter from "./modules/newsletters/Newsletter";
import Newsletters from "./modules/newsletters/Newsletters";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import Schedule from "./modules/schedules/Schedule";
import { useSafeSelector } from "./Store";

export default function App() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    (async function () {
      const { scheduleId } = await APIClient.fetchInit();
      dispatch(fetchSchedule(scheduleId));
    })();
  }, []);

  return (
    <CurrentScheduleContext.Provider value={{ scheduleId: schedule?.id ?? "-1", schedule }}>
      <Router history={history}>
        <Switch>
          <Route path={Routes.NEWSLETTERS} exact component={Newsletters} />
          <Route
            path={Routes.NEWSLETTER(":id")}
            render={({ match }) => <Newsletter newsletterId={match.params.id} />}
          />
          <Route path={Routes.SCHEDULE} component={Schedule} />
          <Route exact path={Routes.BASE_PATH} component={Schedule} />
          <Route>
            <BlankPage />
          </Route>
        </Switch>
      </Router>
    </CurrentScheduleContext.Provider>
  );
}
