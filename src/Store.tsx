import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { accountsReducer } from "./modules/accounts/AccountStore";
import { eventsReducer } from "./modules/events/EventStore";
import { featuredRunsReducer } from "./modules/featured_run/FeaturedRunStore";
import { fetchingReducer } from "./modules/fetching/FetchingStore";
import { gamesReducer } from "./modules/games/GameStore";
import { initReducer } from "./modules/init/InitStore";
import { preshowReducer } from "./modules/preshow/PreshowStore";
import { runsReducer } from "./modules/runs/RunStore";
import { socketReducer } from "./modules/socket/SocketStore";
import { streamsReducer } from "./modules/streams/StreamStore";
import { teamsReducer } from "./modules/teams/TeamStore";
import { timerReducer } from "./modules/timers/TimerStore";

export const combinedReducer = combineReducers({
  accounts: accountsReducer,
  events: eventsReducer,
  featuredRuns: featuredRunsReducer,
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
