export enum StreamRotationActionTypes {
  SET_FEATURED_RUN_LEFT = "SET_FEATURED_RUN_LEFT",
  SET_FEATURED_RUN_RIGHT = "SET_FEATURED_RUN_RIGHT",
  SET_STREAM_ROTATION_ORDER = "SET_STREAM_ROTATION_ORDER",
  SET_STREAM_ROTATION_AUDIO_SOURCE = "SET_STREAM_ROTATION_AUDIO_SOURCE",
  SET_STREAM_ROTATION_ENABLED = "SET_STREAM_ROTATION_ENABLED",
  SET_STREAM_ROTATION_INTERVAL = "SET_STREAM_ROTATION_INTERVAL",
}

export type StreamRotationAction =
  | { type: "SET_FEATURED_RUN_LEFT"; data: { runId: string; rotateAt?: string } }
  | { type: "SET_FEATURED_RUN_RIGHT"; data: { runId: string; rotateAt?: string } }
  | { type: "SET_STREAM_ROTATION_ORDER"; data: { runIds: string[] } }
  | { type: "SET_STREAM_ROTATION_AUDIO_SOURCE"; data: { runId: string } }
  | { type: "SET_STREAM_ROTATION_ENABLED"; data: { enabled: boolean } }
  | { type: "SET_STREAM_ROTATION_INTERVAL"; data: { interval: number } };
