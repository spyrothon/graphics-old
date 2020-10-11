import { RunInfo, RunParticipant } from "./RunInfo";
export { RunInfo, RunParticipant };

export enum RunInfoActionType {
  RUN_INFO_UPDATE_CURRENT_RUN = "RUN_INFO_UPDATE_CURRENT_RUN",
  RUN_INFO_UPDATE_RUN = "RUN_INFO_UPDATE_RUN",
  RUN_INFO_PERSIST_RUN_STARTED = "RUN_INFO_PERSIST_RUN_STARTED",
  RUN_INFO_PERSIST_RUN_SUCCESS = "RUN_INFO_PERSIST_RUN_SUCCESS",
  RUN_INFO_FETCH_RUNS_STARTED = "RUN_INFO_FETCH_RUNS_STARTED",
  RUN_INFO_FETCH_RUNS_SUCCESS = "RUN_INFO_FETCH_RUNS_SUCCESS",
}

export type RunInfoAction =
  | {
      type: RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN;
      runInfo: Partial<RunInfo>;
    }
  | {
      type: RunInfoActionType.RUN_INFO_UPDATE_RUN;
      runInfo: RunInfo;
    }
  | {
      type: RunInfoActionType.RUN_INFO_PERSIST_RUN_STARTED;
      runId: RunInfo["id"];
    }
  | {
      type: RunInfoActionType.RUN_INFO_PERSIST_RUN_SUCCESS;
      runInfo: RunInfo;
    }
  | { type: RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED }
  | {
      type: RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS;
      runs: RunInfo[];
    };
