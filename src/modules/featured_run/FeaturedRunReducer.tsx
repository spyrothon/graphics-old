import { FeaturedRunAction, FeaturedRunActionTypes } from "./FeaturedRunTypes";

import { ActionFor } from "../../Actions";

type FeaturedRunState = {
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

const defaultState: FeaturedRunState = {
  rotationInterval: Math.floor((60 * 60) / 5),
  rotationEnabled: true,
};

function handleSetFeaturedRun(state: FeaturedRunState, { data }: ActionFor<"SET_FEATURED_RUN">) {
  const { runId, rotateAt } = data;

  return {
    ...state,
    runId,
    rotateAt,
  };
}

function handleSetFeaturedRunRotationInterval(
  state: FeaturedRunState,
  { data }: ActionFor<"SET_FEATURED_RUN_ROTATION_INTERVAL">,
) {
  const { rotationInterval } = data;

  return {
    ...state,
    rotationInterval,
  };
}

function handleSetFeaturedRunRotationEnabled(
  state: FeaturedRunState,
  { data }: ActionFor<"SET_FEATURED_RUN_ROTATION_ENABLED">,
) {
  const { rotationEnabled } = data;

  return {
    ...state,
    rotationEnabled,
  };
}

export function featuredRunsReducer(
  state = defaultState,
  action: FeaturedRunAction,
): FeaturedRunState {
  switch (action.type) {
    case FeaturedRunActionTypes.SET_FEATURED_RUN:
      return handleSetFeaturedRun(state, action);
    case FeaturedRunActionTypes.SET_FEATURED_RUN_ROTATION_INTERVAL:
      return handleSetFeaturedRunRotationInterval(state, action);
    case FeaturedRunActionTypes.SET_FEATURED_RUN_ROTATION_ENABLED:
      return handleSetFeaturedRunRotationEnabled(state, action);
  }

  return state;
}
