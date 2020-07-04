import { FetchingActionTypes } from "./FetchingTypes";

export function fetchStarted(fetchId: string) {
  return {
    type: FetchingActionTypes.FETCH_STARTED,
    data: { fetchId },
  };
}

export function fetchSucceeded(fetchId: string) {
  return {
    type: FetchingActionTypes.FETCH_SUCCEEDED,
    data: { fetchId },
  };
}

export function fetchFailed(fetchId: string) {
  return {
    type: FetchingActionTypes.FETCH_FAILED,
    data: { fetchId },
  };
}
