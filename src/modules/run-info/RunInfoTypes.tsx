import { RunInfo } from "./RunInfo";
export type { RunInfo };

export enum RunInfoActionType {
  RUN_INFO_UPDATE_CURRENT_RUN = "RUN_INFO_UPDATE_CURRENT_RUN",
  RUN_INFO_FETCH_RUNS_STARTED = "RUN_INFO_FETCH_RUNS_STARTED",
  RUN_INFO_FETCH_RUNS_SUCCESS = "RUN_INFO_FETCH_RUNS_SUCCESS",
}

export type RunInfoAction =
  | {
      type: RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN;
      runInfo: Partial<RunInfo>;
    }
  | { type: RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED }
  | {
      type: RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS;
      runs: RunInfo[];
    };
