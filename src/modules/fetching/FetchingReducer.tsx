import { FetchState, FetchingAction, FetchingActionTypes } from "./FetchingTypes";

import { ActionFor } from "../../Actions";

type FetchingState = {
  [id: string]: FetchState;
};

const defaultState: FetchingState = {};

function handleFetchStarted(state: FetchingState, { data }: ActionFor<"FETCH_STARTED">) {
  return {
    ...state,
    [data.fetchId]: true,
  };
}

function handleFetchSucceeded(state: FetchingState, { data }: ActionFor<"FETCH_SUCCEEDED">) {
  return {
    ...state,
    [data.fetchId]: false,
  };
}

function handleFetchFailed(state: FetchingState, { data }: ActionFor<"FETCH_FAILED">) {
  return {
    ...state,
    [data.fetchId]: "failed" as "failed",
  };
}

export function fetchingReducer(state = defaultState, action: FetchingAction): FetchingState {
  switch (action.type) {
    case FetchingActionTypes.FETCH_STARTED:
      return handleFetchStarted(state, action);
    case FetchingActionTypes.FETCH_FAILED:
      return handleFetchFailed(state, action);
    case FetchingActionTypes.FETCH_SUCCEEDED:
      return handleFetchSucceeded(state, action);
  }

  return state;
}
