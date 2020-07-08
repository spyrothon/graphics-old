import { createSelector } from "reselect";
import _ from "lodash";

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
