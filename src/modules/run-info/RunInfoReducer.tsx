import { ActionFor, Action } from "../../Actions";
import { createRunInfo } from "./RunInfo";
import { RunInfo, RunInfoActionType } from "./RunInfoTypes";

type RunInfoReducerState = {
  currentRun: RunInfo;
  fetching: boolean;
  persisting: boolean;
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

function handleUpdateRun(
  state: RunInfoReducerState,
  action: ActionFor<RunInfoActionType.RUN_INFO_UPDATE_RUN>,
) {
  const { runInfo } = action;

  return {
    ...state,
    runs: {
      ...state.runs,
      [runInfo.id]: runInfo,
    },
  };
}

function handlePersistRunStarted(
  state: RunInfoReducerState,
  _action: ActionFor<RunInfoActionType.RUN_INFO_PERSIST_RUN_STARTED>,
) {
  return {
    ...state,
    persisting: true,
  };
}

function handlePersistRunSuccess(
  state: RunInfoReducerState,
  action: ActionFor<RunInfoActionType.RUN_INFO_PERSIST_RUN_SUCCESS>,
) {
  const { runInfo } = action;

  return {
    ...state,
    runs: { ...state.runs, [runInfo.id]: runInfo },
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
  persisting: false,
  runs: {},
};

export default function runInfoReducer(
  state: RunInfoReducerState = defaultState,
  action: Action,
): RunInfoReducerState {
  switch (action.type) {
    case RunInfoActionType.RUN_INFO_UPDATE_CURRENT_RUN:
      return handleUpdateCurrentRun(state, action);
    case RunInfoActionType.RUN_INFO_UPDATE_RUN:
      return handleUpdateRun(state, action);
    case RunInfoActionType.RUN_INFO_PERSIST_RUN_STARTED:
      return handlePersistRunStarted(state, action);
    case RunInfoActionType.RUN_INFO_PERSIST_RUN_SUCCESS:
      return handlePersistRunSuccess(state, action);
    case RunInfoActionType.RUN_INFO_FETCH_RUNS_STARTED:
      return handleFetchRunsStarted(state, action);
    case RunInfoActionType.RUN_INFO_FETCH_RUNS_SUCCESS:
      return handleFetchRunsSuccess(state, action);
  }

  return state;
}
