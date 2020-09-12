import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import remoteReducer from "./modules/remote/RemoteReducer";
import runInfoReducer from "./modules/run-info/RunInfoReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const combinedReducer = combineReducers({
  remote: remoteReducer,
  runInfo: runInfoReducer,
});
export const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk)));

export type StoreState = ReturnType<typeof combinedReducer>;
export type Store = typeof store;

export const getProp = <T extends any>(key: string) => (
  _: StoreState,
  props: Record<string, any>,
): T => {
  return props[key];
};

export const useSafeSelector: TypedUseSelectorHook<StoreState> = useSelector;
