import { Schedule } from "../APITypes";

export type SyncSocketMessage =
  | { type: "ping" }
  | { type: "refresh_runs" }
  | { type: "load_schedule"; schedule: Schedule };
