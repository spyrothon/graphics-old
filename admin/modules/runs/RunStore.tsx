import { createSelector } from "reselect";

import { StoreState } from "../../Store";

const getRunsState = (globalState: StoreState) => globalState.runs;

export const getCurrentRunId = createSelector([getRunsState], (state) => state.currentRunId);
export const getCurrentRun = createSelector([getRunsState], (state) =>
  state.currentRunId != null ? state.runs[state.currentRunId] : undefined,
);
export const isFetchingRuns = createSelector([getRunsState], (state) => state.fetching);
export const getRuns = createSelector([getRunsState], (state) => Object.values(state.runs));
