import { StreamRotationAction, StreamRotationActionTypes } from "./StreamRotationTypes";

import { ActionFor } from "../../Actions";

type StreamRotationState = {
  runId?: string;
  rotateAt?: string;
  // Evenly split feature time within an hour across the 7 teams
  // This can be overwritten by the admin dashboard.
  rotationInterval: number;
  // `true` when the stream should automatically rotate to the next
  // stream when `rotateAt` is reached. `false` if it should stay
  // on the current run.
  rotationEnabled: boolean;
};

const defaultState: StreamRotationState = {
  rotationInterval: Math.floor((60 * 60) / 5),
  rotationEnabled: true,
};

function handleSetFeaturedRunLeft(
  state: StreamRotationState,
  { data }: ActionFor<"SET_FEATURED_RUN_LEFT">,
) {
  const { runId, rotateAt } = data;

  return {
    ...state,
    runId,
    rotateAt,
  };
}

function handleSetStreamRotationRotationInterval(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_INTERVAL">,
) {
  const { interval } = data;

  return {
    ...state,
    rotationInterval: interval,
  };
}

function handleSetStreamRotationRotationEnabled(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_ENABLED">,
) {
  const { enabled } = data;

  return {
    ...state,
    rotationEnabled: enabled,
  };
}

export function streamRotationReducer(
  state = defaultState,
  action: StreamRotationAction,
): StreamRotationState {
  switch (action.type) {
    case StreamRotationActionTypes.SET_FEATURED_RUN_LEFT:
      return handleSetFeaturedRunLeft(state, action);
    case StreamRotationActionTypes.SET_FEATURED_RUN_RIGHT:
      return handleSetFeaturedRunRight(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_INTERVAL:
      return handleSetStreamRotationRotationInterval(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_ENABLED:
      return handleSetStreamRotationRotationEnabled(state, action);
  }

  return state;
}
