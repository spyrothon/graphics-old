import { Schedule, Interview, Run } from "../APITypes";

export type SyncSocketMessage =
  | { type: "ping" }
  | { type: "refresh_runs" }
  | { type: "refresh_interviews" }
  | { type: "load_schedule"; schedule: Schedule }
  | { type: "load_run"; run: Run }
  | { type: "load_interview"; interview: Interview };
