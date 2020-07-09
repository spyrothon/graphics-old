import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import _ from "lodash";

import { getProp } from "../../Store";
import { getSortedTeams } from "../teams/TeamStore";
import { getSortedRunsByTeam } from "./RunStore";
import { Run } from "./RunTypes";

export function getActiveRun(runs: Run[]) {
  return _.find(runs, (run) => !run.finished) || runs[runs.length - 1];
}

export const getActiveRunIds = createSelector(
  [getSortedRunsByTeam, getSortedTeams],
  (sortedRunsByTeam, teams) => {
    return _.chain(teams)
      .map((team) => {
        const runs = sortedRunsByTeam[team.id];
        return getActiveRun(runs);
      })
      .map("id")
      .value();
  },
);

export const getActiveRunForTeam = createCachedSelector(
  [getSortedRunsByTeam, getProp<string>("teamId")],
  (sortedRunsByTeam, teamId) => {
    const runs = sortedRunsByTeam[teamId];
    if (runs == null) return null;

    return getActiveRun(sortedRunsByTeam[teamId]);
  },
)(getProp<string>("teamId"));
