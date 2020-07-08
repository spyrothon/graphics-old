import { CollectionType, EVENT_ID } from "../../Constants";

import { fetchAccounts } from "../accounts/AccountActions";
import { fetchEvent } from "../events/EventActions";
import { fetchGames } from "../games/GameActions";
import { fetchRuns } from "../runs/RunActions";
import { fetchTeams } from "../teams/TeamActions";
import { SafeDispatch } from "../../hooks/useDispatch";

export default function resync(dispatch: SafeDispatch, collection: CollectionType) {
  switch (collection) {
    case CollectionType.ACCOUNTS:
      dispatch(fetchAccounts());
      return;
    case CollectionType.EVENT:
      dispatch(fetchEvent(EVENT_ID));
      return;
    case CollectionType.GAMES:
      dispatch(fetchGames());
      return;
    case CollectionType.RUNS:
      dispatch(fetchRuns(EVENT_ID, {}));
      return;
    case CollectionType.TEAMS:
      dispatch(fetchTeams(EVENT_ID));
      return;
  }
}
