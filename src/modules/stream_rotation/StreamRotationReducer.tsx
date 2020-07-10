import { StreamRotationAction, StreamRotationActionTypes } from "./StreamRotationTypes";

import { ActionFor } from "../../Actions";

type StreamRotationState = {
  featuredLeftId?: string;
  featuredRightId?: string;
  rotateAt?: string;
  // Evenly split feature time within an hour across the 7 teams
  // This can be overwritten by the admin dashboard.
  rotationInterval: number;
  // `true` when the stream should automatically rotate to the next
  // stream when `rotateAt` is reached. `false` if it should stay
  // on the current run.
  rotationEnabled: boolean;
  rotationIndex: number;
};

const defaultState: StreamRotationState = {
  rotationInterval: Math.floor((60 * 60) / 5),
  rotationEnabled: true,
  rotationIndex: 0,
};

function handleSetRotationIndex(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_INDEX">,
) {
  const { index, rotateAt } = data;
  return {
    ...state,
    rotationIndex: index,
    rotateAt,
  };
}

function handleSetFeaturedLeftId(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_FEATURED_LEFT_ID">,
) {
  const { runId, rotateAt } = data;
  return {
    ...state,
    featuredLeftId: runId,
    rotateAt,
  };
}

function handleSetFeaturedRightId(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_FEATURED_RIGHT_ID">,
) {
  const { runId, rotateAt } = data;
  return {
    ...state,
    featuredRightId: runId,
    rotateAt,
  };
}

function handleSetStreamRotationAt(
  state: StreamRotationState,
  { data }: ActionFor<"SET_STREAM_ROTATION_AT">,
) {
  const { rotateAt } = data;
  return {
    ...state,
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
    case StreamRotationActionTypes.SET_STREAM_ROTATION_INDEX:
      return handleSetRotationIndex(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_FEATURED_LEFT_ID:
      return handleSetFeaturedLeftId(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_FEATURED_RIGHT_ID:
      return handleSetFeaturedRightId(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_AT:
      return handleSetStreamRotationAt(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_INTERVAL:
      return handleSetStreamRotationRotationInterval(state, action);
    case StreamRotationActionTypes.SET_STREAM_ROTATION_ENABLED:
      return handleSetStreamRotationRotationEnabled(state, action);
  }

  return state;
}
