import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { accountsReducer } from "./modules/accounts/AccountReducer";
import { eventsReducer } from "./modules/events/EventReducer";
import { featuredRunsReducer } from "./modules/featured_run/FeaturedRunReducer";
import { fetchingReducer } from "./modules/fetching/FetchingReducer";
import { gamesReducer } from "./modules/games/GameReducer";
import { initReducer } from "./modules/init/InitReducer";
import { omnibarReducer } from "./modules/omnibar/OmnibarReducer";
import { preshowReducer } from "./modules/preshow/PreshowReducer";
import { runsReducer } from "./modules/runs/RunReducer";
import { socketReducer } from "./modules/socket/SocketReducer";
import { streamsReducer } from "./modules/streams/StreamReducer";
import { teamsReducer } from "./modules/teams/TeamReducer";
import { timerReducer } from "./modules/timers/TimerReducer";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const combinedReducer = combineReducers({
  accounts: accountsReducer,
  events: eventsReducer,
  featuredRun: featuredRunsReducer,
  fetching: fetchingReducer,
  games: gamesReducer,
  init: initReducer,
  omnibar: omnibarReducer,
  preshow: preshowReducer,
  runs: runsReducer,
  socket: socketReducer,
  streams: streamsReducer,
  teams: teamsReducer,
  timer: timerReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk)));

export const getProp = <T extends any>(key: string) => (
  _: StoreState,
  props: Record<string, any>,
): T => {
  return props[key];
};

export const useSafeSelector: TypedUseSelectorHook<StoreState> = useSelector;
