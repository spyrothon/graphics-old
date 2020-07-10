import { createSelector } from "reselect";
import { DateTime } from "luxon";
import _ from "lodash";

import { getCurrentTime } from "../timers/TimerStore";
import { StoreState } from "../../Store";

export const getFeaturedLeftId = (state: StoreState) => state.streamRotation.featuredLeftId;
export const getFeaturedRightId = (state: StoreState) => state.streamRotation.featuredRightId;
export const getRotationInterval = (state: StoreState) => state.streamRotation.rotationInterval;
export const getRotationEnabled = (state: StoreState) => state.streamRotation.rotationEnabled;
export const getRotateAtRaw = (state: StoreState) => state.streamRotation.rotateAt;

export const getRotateAt = createSelector(
  [getRotateAtRaw],
  (rawTime) => rawTime && DateTime.fromISO(rawTime),
);

export const getShouldRotate = createSelector(
  [getRotationEnabled, getRotateAt, getCurrentTime],
  (rotationEnabled, rotateAt, currentTime) => {
    if (!rotationEnabled || !rotateAt || !currentTime) return false;
    return rotateAt.diff(currentTime).valueOf() <= 0;
  },
);

export const getNextRotatesAt = createSelector(
  [getCurrentTime, getRotationInterval],
  (currentTime, rotationInterval) => {
    if (currentTime == null || rotationInterval == null) return undefined;

    return currentTime.plus({ seconds: rotationInterval }).toISO();
  },
);
