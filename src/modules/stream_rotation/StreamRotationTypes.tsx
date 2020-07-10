export enum StreamRotationActionTypes {
  SET_STREAM_ROTATION_FEATURED_LEFT_ID = "SET_STREAM_ROTATION_FEATURED_LEFT_ID",
  SET_STREAM_ROTATION_FEATURED_RIGHT_ID = "SET_STREAM_ROTATION_FEATURED_RIGHT_ID",
  SET_STREAM_ROTATION_AT = "SET_STREAM_ROTATION_AT",
  SET_STREAM_ROTATION_ENABLED = "SET_STREAM_ROTATION_ENABLED",
  SET_STREAM_ROTATION_INTERVAL = "SET_STREAM_ROTATION_INTERVAL",
}

export type StreamRotationAction =
  | { type: "SET_STREAM_ROTATION_FEATURED_LEFT_ID"; data: { runId?: string; rotateAt?: string } }
  | { type: "SET_STREAM_ROTATION_FEATURED_RIGHT_ID"; data: { runId?: string; rotateAt?: string } }
  | { type: "SET_STREAM_ROTATION_AT"; data: { rotateAt: string } }
  | { type: "SET_STREAM_ROTATION_ENABLED"; data: { enabled: boolean } }
  | { type: "SET_STREAM_ROTATION_INTERVAL"; data: { interval: number } };
