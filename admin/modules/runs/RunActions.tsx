import APIClient from "../../../api/APIClient";
import { Run } from "../../../api/APITypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { RunAction, RunActionType } from "./RunsTypes";

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

    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadRun(run: Run): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs: [run] };
}

export function fetchRunsSuccess(runs: Run[]): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs };
}

export function persistRun(runId: string, changes: Partial<Run>) {
  return async (dispatch: SafeDispatch) => {
    const filteredChanges = { ...changes };
    if (changes.runners != null) {
      filteredChanges.runners = changes.runners.filter((entry) => entry?.displayName !== "");
    }
    if (changes.commentators != null) {
      filteredChanges.commentators = changes.commentators.filter(
        (entry) => entry?.displayName !== "",
      );
    }
    const updatedRun = await APIClient.updateRun(runId, filteredChanges);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}
