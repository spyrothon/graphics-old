export type FetchState = boolean | "failed";

export enum FetchingActionTypes {
  FETCH_STARTED = "FETCH_STARTED",
  FETCH_FAILED = "FETCH_FAILED",
  FETCH_SUCCEEDED = "FETCH_SUCCEEDED",
}

export type FetchingAction =
  | { type: "FETCH_STARTED"; data: { fetchId: string } }
  | { type: "FETCH_FAILED"; data: { fetchId: string } }
  | { type: "FETCH_SUCCEEDED"; data: { fetchId: string } };
