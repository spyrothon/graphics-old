import { StreamRotationActionTypes, StreamRotationAction } from "./StreamRotationTypes";

export function setFeaturedRunLeft(runId?: string, rotateAt?: string): StreamRotationAction {
  return {
    type: StreamRotationActionTypes.SET_STREAM_ROTATION_FEATURED_LEFT_ID,
    data: { runId, rotateAt },
  };
}

export function setFeaturedRunRight(runId?: string, rotateAt?: string): StreamRotationAction {
  return {
    type: StreamRotationActionTypes.SET_STREAM_ROTATION_FEATURED_RIGHT_ID,
    data: { runId, rotateAt },
  };
}
