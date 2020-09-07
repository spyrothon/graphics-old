import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { useSelector, TypedUseSelectorHook } from "react-redux";

export const combinedReducer = combineReducers({});

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
