import { ActionFor, Action } from "../../Actions";
import { createRunInfo } from "./RunInfo";
import { RunInfo, RunInfoActionType } from "./RunInfoTypes";

type RunInfoReducerState = {
  currentRun: RunInfo;
  fetching: boolean;
  runs: { [id: string]: RunInfo };
};

function handleUpdateCurrentRun(
  state: RunInfoReducerState,
  action: ActionFor<RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN>,
) {
  const { runInfo } = action;

  return {
    ...state,
    currentRun: { ...state.currentRun, ...runInfo },
  };
}

function handleFetchRunsStarted(
  state: RunInfoReducerState,
  _action: ActionFor<RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchRunsSuccess(
  state: RunInfoReducerState,
  action: ActionFor<RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS>,
) {
  const { runs } = action;
  const runsById = runs.reduce<{ [id: string]: RunInfo }>((acc, run) => {
    acc[run.id] = run;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    runs: { ...state.runs, ...runsById },
  };
}

const defaultState: RunInfoReducerState = {
  currentRun: createRunInfo({}),
  fetching: false,
  runs: {},
};

export default function runInfoReducer(
  state: RunInfoReducerState = defaultState,
  action: Action,
): RunInfoReducerState {
  switch (action.type) {
    case RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN:
      return handleUpdateCurrentRun(state, action);
    case RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED:
      return handleFetchRunsStarted(state, action);
    case RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS:
      return handleFetchRunsSuccess(state, action);
  }

  return state;
}
