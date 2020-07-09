import { createSelector } from "reselect";
import { DateTime } from "luxon";
import _ from "lodash";

import { getActiveRunIds } from "../runs/ActiveRunStore";
import { getRuns } from "../runs/RunStore";
import { getCurrentTime } from "../timers/TimerStore";
import { StoreState } from "../../Store";

export const getStreamRotationId = (state: StoreState) => state.streamRotation.runId;
export const getRotationInterval = (state: StoreState) => state.streamRotation.rotationInterval;
export const getRotationEnabled = (state: StoreState) => state.streamRotation.rotationEnabled;
export const getRotateAtRaw = (state: StoreState) => state.streamRotation.rotateAt;

export const getRotateAt = createSelector(
  [getRotateAtRaw],
  (rawTime) => rawTime && DateTime.fromISO(rawTime),
);

export const getStreamRotation = createSelector([getRuns, getStreamRotationId], (runs, runId) =>
  runs.find((run) => run.id === runId),
);

export const shouldRotate = createSelector(
  [getRotationEnabled, getRotateAt, getCurrentTime],
  (rotationEnabled, rotateAt, currentTime) => {
    if (!rotationEnabled || !rotateAt || !currentTime) return false;

    return rotateAt.diff(currentTime).valueOf() <= 0;
  },
);

export const getNextRotatesAt = createSelector(
  [getCurrentTime, getRotationInterval],
  (currentTime, rotationInterval) => {
    if (currentTime == null || rotationInterval == null) return null;

    return currentTime.plus({ seconds: rotationInterval }).toISO();
  },
);

export const getNextstreamRotationId = createSelector(
  [getStreamRotationId, getActiveRunIds],
  (streamRotationId, activeRunIds) => {
    const featuredIndex = _.findIndex(activeRunIds, (id) => id == streamRotationId) || 0;
    return activeRunIds[(featuredIndex + 1) % activeRunIds.length];
  },
);
