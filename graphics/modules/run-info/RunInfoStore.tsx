import { createSelector } from "reselect";

import { StoreState } from "../../Store";

const getRunInfoState = (globalState: StoreState) => globalState.runInfo;

export const getCurrentRunInfo = createSelector([getRunInfoState], (state) => state.currentRun);
export const isFetchingRuns = createSelector([getRunInfoState], (state) => state.fetching);
export const getRuns = createSelector([getRunInfoState], (state) => Object.values(state.runs));
