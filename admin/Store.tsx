import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth/AuthReducer";
import interviewsReducer from "./modules/interviews/InterviewsReducer";
import schedulesReducer from "./modules/schedules/SchedulesReducer";
import remoteReducer from "./modules/remote/RemoteReducer";
import runsReducer from "./modules/runs/RunsReducer";

export const combinedReducer = combineReducers({
  auth: authReducer,
  interviews: interviewsReducer,
  schedules: schedulesReducer,
  remote: remoteReducer,
  runs: runsReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk)));

export type StoreState = ReturnType<typeof combinedReducer>;
export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;

export const getProp = <T extends any>(key: string) => (
  _: StoreState,
  props: Record<string, any>,
): T => {
  return props[key];
};

export const useSafeSelector: TypedUseSelectorHook<StoreState> = useSelector;
