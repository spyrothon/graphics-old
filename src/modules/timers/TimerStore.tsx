import { DateTime, DurationUnit } from "luxon";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { getProp, StoreState } from "../../Store";

const getCurrentTimeRaw = (state: StoreState) => state.timer.currentTime;

export const getCurrentTime = createSelector([getCurrentTimeRaw], (rawTime) =>
  DateTime.fromISO(rawTime),
);

export const getCurrentTimeWithAccuracy = createCachedSelector(
  [getCurrentTime, getProp<DurationUnit>("unit")],
  (time, unit) => time.startOf(unit),
)(getProp<DurationUnit>("unit"));

export const getCurrentTimeToMinute = createSelector([getCurrentTime], (time) =>
  time.startOf("minute"),
);

export const getCurrentTimeISOToMinute = createSelector([getCurrentTime], (time) =>
  time.startOf("minute").toISO(),
);
