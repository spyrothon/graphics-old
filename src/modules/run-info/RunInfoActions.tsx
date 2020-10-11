import HTTPUtils from "../../util/HTTPUtils";
import { Endpoints } from "../../Constants";
import { RunInfo, RunInfoAction, RunInfoActionType } from "./RunInfoTypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { fromServer, toServer } from "./RunInfo";

export function updateCurrentRun(runInfo: Partial<RunInfo>): RunInfoAction {
  return {
    type: RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN,
    runInfo,
  };
}

export function updateRun(runInfo: RunInfo): RunInfoAction {
  return {
    type: RunInfoActionType.RUN_INFO_UPDATE_RUN,
    runInfo,
  };
}

export function fetchRuns() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED });

    const runs = await HTTPUtils.get(Endpoints.RUNS);
    dispatch({ type: RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS, runs: runs.map(fromServer) });
  };
}

export function persistRun(runInfo: RunInfo) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: RunInfoActionType.RUN_INFO_PERSIST_RUN_STARTED, runId: runInfo.id });

    const runResponse = await HTTPUtils.put(Endpoints.UPDATE_RUN(runInfo.id), toServer(runInfo));
    dispatch({
      type: RunInfoActionType.RUN_INFO_PERSIST_RUN_SUCCESS,
      runInfo: fromServer(runResponse),
    });
  };
}
