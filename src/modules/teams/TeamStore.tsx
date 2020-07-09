import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import _ from "lodash";

import { timeFromISO } from "../../Util";

import { getRuns } from "../runs/RunStore";
import { getCurrentTime } from "../timers/TimerStore";
import { StoreState, getProp } from "../../Store";

export const getTeams = (state: StoreState) => Object.values(state.teams);
export const getTeam = (state: StoreState, props: { teamId: string }) => state.teams[props.teamId];

export const getSortedTeams = createSelector([getTeams], (teams) => _.sortBy(teams, "id"));

export const getTeamRuns = createCachedSelector(
  [getRuns, getProp<string>("teamId")],
  (runs, teamId) => {
    return _.chain(runs)
      .filter((run) => run.team_id == teamId)
      .sortBy("index")
      .value();
  },
)(getProp<string>("teamId"));

export const getTeamRunIds = createCachedSelector([getTeamRuns], (runs) => _.map(runs, "id"))(
  getProp<string>("teamId"),
);

export const getTeamRunIdsGameOrdered = createCachedSelector([getTeamRuns], (runs) =>
  _.chain(runs)
    .sortBy("game_id")
    .map("id")
    .value(),
)(getProp<string>("teamId"));

export const getTeamOriginalEstimate = createCachedSelector([getTeamRuns], (runs) =>
  _.sumBy(runs, "est_seconds"),
)(getProp<string>("teamId"));

export const getTeamLiveEstimate = createCachedSelector(
  [getTeamRuns, getCurrentTime],
  (runs, currentTime) => {
    return _.sumBy(runs, (run) => {
      if (run.finished) {
        return run.actual_seconds ?? 0;
      } else if (run.started_at) {
        return Math.max(
          currentTime.diff(timeFromISO(run.started_at)).as("seconds"),
          run.est_seconds,
        );
      } else {
        return run.est_seconds || 0;
      }
    });
  },
)(getProp<string>("teamId"));

const getTeamCurrentRunTime = createCachedSelector(
  [getTeamRuns, getCurrentTime],
  (runs, currentTime) => {
    return _.sumBy(runs, (run) => {
      if (run.finished) {
        return run.actual_seconds ?? 0;
      } else if (run.started_at) {
        return currentTime.diff(timeFromISO(run.started_at)).as("seconds");
      } else {
        return 0;
      }
    });
  },
)(getProp<string>("teamId"));

// Returns true if all of the team's runs have been marked as finished.
export const isTeamFinished = createCachedSelector(
  [getTeam],
  (team) => !!team.actual_time_seconds,
)(getProp<string>("teamId"));

// Returns a value between 0 and 100 representing an estimated level of
// progression through the team's runs.
export const getTeamProgress = createCachedSelector(
  [getTeamCurrentRunTime, getTeamLiveEstimate, isTeamFinished],
  (currentRunTime, liveEstimate, isFinished) => {
    // If the team is finished, just say 100%.
    if (isFinished) return 100;

    const progress = currentRunTime / liveEstimate;

    const percent = Math.min(0.99, progress);
    return percent * 100;
  },
)(getProp<string>("teamId"));
