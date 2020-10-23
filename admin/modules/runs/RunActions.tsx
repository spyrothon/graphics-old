import APIClient from "../../../api/APIClient";
import { Run } from "../../../api/APITypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { RunAction, RunActionType } from "./RunsTypes";

export function setCurrentRun(runId?: string): RunAction {
  return {
    type: RunActionType.RUNS_SET_CURRENT_RUN,
    runId,
  };
}

export function updateRun(run: Run): RunAction {
  return {
    type: RunActionType.RUNS_UPDATE_RUN,
    run,
  };
}

export function fetchRuns() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: RunActionType.RUNS_FETCH_RUNS_STARTED });
    const runs = await APIClient.fetchRuns();

    dispatch({ type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs });
  };
}

export function persistRun(run: Run) {
  return async (dispatch: SafeDispatch) => {
    const updatedRun = await APIClient.updateRun(run.id, run);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}
