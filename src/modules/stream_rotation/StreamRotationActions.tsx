import { StreamRotationActionTypes, StreamRotationAction } from "./StreamRotationTypes";

export function setRotationIndex(index: number, rotateAt?: string): StreamRotationAction {
  return {
    type: StreamRotationActionTypes.SET_STREAM_ROTATION_INDEX,
    data: { index, rotateAt },
  };
}

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
