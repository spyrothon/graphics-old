import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import _ from "lodash";

import { timeFromISO } from "../../Util";
import { StoreState, getProp } from "../../Store";

import { getCurrentTime } from "../timers/TimerStore";

export const getRuns = (state: StoreState) => Object.values(state.runs.runs);
export const getRun = (state: StoreState, props: { runId: string }) => state.runs.runs[props.runId];

export const getRunsByTeam = createSelector([getRuns], (runs) =>
  _.chain(runs)
    .sortBy("index")
    .groupBy("team_id")
    .value(),
);

export const getCurrentRunSeconds = createCachedSelector(
  [getRun, getCurrentTime],
  (run, currentTime) => {
    const { started_at, actual_seconds } = run;
    if (actual_seconds) {
      return actual_seconds;
    } else if (started_at == null) {
      return 0;
    } else if (currentTime != null) {
      return currentTime.diff(timeFromISO(started_at)).as("seconds");
    } else {
      // If currentTime doesn't exist, we can't state progress.
      return 0;
    }
  },
)(getProp<string>("runId"));

export const getRunProgress = createCachedSelector([getRun, getCurrentTime], (run, currentTime) => {
  const { finished, started_at, pb_seconds } = run;
  if (finished) {
    return 100;
  } else if (started_at == null) {
    return 0;
  } else if (currentTime != null) {
    const elapsed = currentTime.diff(timeFromISO(started_at)).as("seconds");
    return Math.min(0.99, elapsed / pb_seconds) * 100;
  } else {
    // If currentTime doesn't exist, we can't state progress.
    return 0;
  }
})(getProp("runId"));

export const getSortedRunsByTeam = createSelector([getRuns], (runs) =>
  _.chain(Object.values(runs))
    .sortBy("index")
    .groupBy("team_id")
    .value(),
);

export const getSortedRunsForTeam = createCachedSelector(
  [getSortedRunsByTeam, getProp<string>("teamId")],
  (runs, teamId) => {
    return runs[teamId];
  },
)(getProp("teamId"));
