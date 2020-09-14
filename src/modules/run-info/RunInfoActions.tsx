import HTTPUtils from "../../util/HTTPUtils";
import { Endpoints } from "../../Constants";
import { RunInfo, RunInfoAction, RunInfoActionType } from "./RunInfoTypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { fromServer } from "./RunInfo";

export function updateCurrentRun(runInfo: Partial<RunInfo>): RunInfoAction {
  return {
    type: RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN,
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
