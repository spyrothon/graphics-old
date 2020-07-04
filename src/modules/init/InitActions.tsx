import * as AccountActions from "../accounts/AccountActions";
import * as EventActions from "../events/EventActions";
import * as GameActions from "../games/GameActions";
import * as RunActions from "../runs/RunActions";
import * as TeamActions from "../teams/TeamActions";
import { InitActionTypes } from "./InitTypes";

import { EVENT_ID } from "../../Constants";
import { SafeDispatch } from "../../hooks/useDispatch";

export function fetchAll(eventId: string) {
  return (dispatch: SafeDispatch) => {
    Promise.all([
      dispatch(EventActions.fetchEvent(eventId)),
      dispatch(TeamActions.fetchTeams(eventId)),
      dispatch(AccountActions.fetchAccounts()),
      dispatch(GameActions.fetchGames()),
      dispatch(RunActions.fetchRuns(EVENT_ID, {})),
    ]).then(() => {
      dispatch(dataReady());
    });
  };
}

export function dataReady() {
  return {
    type: InitActionTypes.DATA_READY,
  };
}
