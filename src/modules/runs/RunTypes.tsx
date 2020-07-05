export enum RunEventType {
  STARTED = "run_started",
  FINISHED = "run_finished",
  RESUMED = "run_resumed",
  RESET = "run_reset",
}

export type RunUpdate = {
  updateId: string;
  runId: string;
  type: RunEventType;
  extra?: any;
};

export type RunEvent = {
  id: string;
  run_id: string;
  type: RunEventType;
  occurred_at: string;
};

export type Run = {
  id: string;
  run_events: RunEvent[];
  team_id: string;
  account_id: string;
  game_id: string;
  category_id: string;
  pb_seconds: number;
  est_seconds: number;
  actual_seconds?: number;
  started_at?: string;
  finishsed_at?: string;
  index: number;
  finished: boolean;
  accepted: boolean;
};

export enum RunActionTypes {
  RECEIVE_RUNS = "RECEIVE_RUNS",
  RECEIVE_RUN_UPDATE = "RECEIVE_RUN_UPDATE",
  RUN_UPDATE_HANDLED = "RUN_UPDATE_HANDLED",
}

export type RunAction =
  | { type: "RECEIVE_RUNS"; data: { runs: Run[] } }
  | { type: "RECEIVE_RUN_UPDATE"; data: RunUpdate }
  | { type: "RUN_UPDATE_HANDLED"; data: { updateId: string } };
