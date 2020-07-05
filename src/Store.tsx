import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { accountsReducer } from "./modules/accounts/AccountReducer";
import { eventsReducer } from "./modules/events/EventReducer";
import { featuredRunsReducer } from "./modules/featured_run/FeaturedRunReducer";
import { fetchingReducer } from "./modules/fetching/FetchingReducer";
import { gamesReducer } from "./modules/games/GameReducer";
import { initReducer } from "./modules/init/InitReducer";
import { preshowReducer } from "./modules/preshow/PreshowReducer";
import { runsReducer } from "./modules/runs/RunReducer";
import { socketReducer } from "./modules/socket/SocketReducer";
import { streamsReducer } from "./modules/streams/StreamReducer";
import { teamsReducer } from "./modules/teams/TeamReducer";
import { timerReducer } from "./modules/timers/TimerReducer";

export const combinedReducer = combineReducers({
  accounts: accountsReducer,
  events: eventsReducer,
  featuredRun: featuredRunsReducer,
  fetching: fetchingReducer,
  games: gamesReducer,
  init: initReducer,
  preshow: preshowReducer,
  runs: runsReducer,
  socket: socketReducer,
  streams: streamsReducer,
  teams: teamsReducer,
  timer: timerReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;

export const store = createStore(combinedReducer, applyMiddleware(thunk));

export const getProp = <T extends any>(key: string) => (
  _: StoreState,
  props: Record<string, any>,
): T => {
  return props[key];
};
