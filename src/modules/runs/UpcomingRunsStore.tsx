import { createSelector } from "reselect";
import _ from "lodash";
import { DateTime } from "luxon";

import { timeFromISO } from "../../Util";
import { getProp } from "../../Store";
import { getCurrentTimeISOToMinute } from "../timers/TimerStore";
import { getRunsByTeam } from "./RunStore";

type TeamScheduleRun = {
  runId: string;
  estimatedStartTime: DateTime;
  isStarted: boolean;
};

// This is only updated once a minute because it's fairly expensive. The next
// best option is every second, which is way too frequent.
//
// Returns a map of teamId => [{runId, estimatedStartTime, isStarted}]
export const getEstimatedRunSchedulesByTeam = createSelector(
  [getCurrentTimeISOToMinute, getRunsByTeam],
  (currentTimeISO, runsByTeam): { [id: string]: TeamScheduleRun[] } => {
    return _.mapValues(runsByTeam, (runs) => {
      let lastEndedAt = timeFromISO(currentTimeISO);
      return _.map(runs, (run, index) => {
        const runDuration = run.actual_seconds || run.est_seconds;
        if (run.started_at) {
          const startedAt = timeFromISO(run.started_at);
          lastEndedAt = startedAt.plus({ seconds: runDuration });
          return {
            runId: run.id,
            estimatedStartTime: startedAt,
            isStarted: true,
          };
        } else {
          if (index === 0) lastEndedAt = timeFromISO(currentTimeISO);
          const result = {
            runId: run.id,
            estimatedStartTime: lastEndedAt.plus(0),
            isStarted: false,
          };

          lastEndedAt = lastEndedAt.plus({ seconds: runDuration });
          return result;
        }
      });
    });
  },
);

export const getUpcomingRuns = createSelector(
  [getEstimatedRunSchedulesByTeam, getProp<number>("count")],
  (runsByTeam, count) => {
    // @ts-ignore `flatMap` does collapse an object of arrays, but the type doesn't know that
    const sortedNextRuns: TeamScheduleRun[] = _.chain(runsByTeam)
      .flatMap()
      .reject("isStarted")
      // @ts-ignore `flatMap` does collapse an object of arrays, but the type doesn't know that
      .sortBy((r: TeamScheduleRun) => r.estimatedStartTime.toMillis())
      .value();

    if (count) {
      return sortedNextRuns.slice(0, count);
    } else {
      return sortedNextRuns;
    }
  },
);
