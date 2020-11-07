import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Routes, MAIN_SCHEDULE_ID } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import DS1 from "./layouts/DS1";
import FiveFour1 from "./layouts/FiveFour1";
import GBA1 from "./layouts/GBA1";
import BingoStandard1v1 from "./layouts/bingo/BingoStandard1v1";
import BingoStandard2v2 from "./layouts/bingo/BingoStandard2v2";
import BreakCountdown from "./layouts/breaks/BreakCountdown";
import BreakLeft from "./layouts/breaks/BreakLeft";
import BreakRight from "./layouts/breaks/BreakRight";
import HD1 from "./layouts/hd/HD1";
import HD2 from "./layouts/hd/HD2";
import InterviewOpen from "./layouts/interview/InterviewOpen";
import QuizCorner from "./layouts/interview/QuizCorner";
import Standard1 from "./layouts/standard/Standard1";
import Standard2 from "./layouts/standard/Standard2";
import Standard4 from "./layouts/standard/Standard4";
import { history } from "./modules/router/RouterUtils";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import SyncSocketManager from "./modules/sync/SyncSocketManager";
import SVGLibrary from "./uikit/svg/SVGLibrary";

export default function App() {
  React.useEffect(() => {
    SyncSocketManager.init();
    return () => {
      SyncSocketManager.stop();
    };
  }, []);

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
        <Route path={Routes.DS_1} component={DS1} />

        <Route path={Routes.FIVEFOUR_1} component={FiveFour1} />

        <Route path={Routes.STANDARD_BINGO_1V1} component={BingoStandard1v1} />
        <Route path={Routes.STANDARD_BINGO_2V2} component={BingoStandard2v2} />

        <Route path={Routes.BREAK_LEFT} component={BreakLeft} />
        <Route path={Routes.BREAK_RIGHT} component={BreakRight} />
        <Route path={Routes.BREAK_COUNTDOWN} component={BreakCountdown} />

        <Route path={Routes.INTERVIEW} component={InterviewOpen} />
        <Route path={Routes.QUIZ_CORNER} component={QuizCorner} />
      </Switch>
    </Router>
  );
}
