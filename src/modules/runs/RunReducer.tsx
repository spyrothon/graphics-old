import { Run, RunAction, RunActionTypes, RunEventType, RunUpdate } from "./RunTypes";

import { ActionFor } from "../../Actions";

type RunState = {
  runs: { [id: string]: Run };
  runUpdateQueue: RunUpdate[];
};

const defaultState: RunState = { runs: {}, runUpdateQueue: [] };

function handleReceiveRuns(state: RunState, { data }: ActionFor<"RECEIVE_RUNS">) {
  const { runs } = data;
  const runsById = runs.reduce((acc, run) => {
    // @ts-ignore
    acc[run.id] = run;
    return acc;
  }, {});

  return {
    ...state,
    runs: {
      ...state.runs,
      ...runsById,
    },
  };
}

function handleReceiveRunUpdate(state: RunState, { data }: ActionFor<"RECEIVE_RUN_UPDATE">) {
  const { runId, updateId, type } = data;

  if (type == RunEventType.FINISHED) {
    return {
      ...state,
      runUpdateQueue: [...state.runUpdateQueue, { type, runId, updateId }],
    };
  } else {
    return state;
  }
}

function handleRunUpdateHandled(state: RunState, { data }: ActionFor<"RUN_UPDATE_HANDLED">) {
  const { updateId } = data;

  return {
    ...state,
    runUpdateQueue: state.runUpdateQueue.filter(({ updateId: id }) => id !== updateId),
  };
}

export function runsReducer(state = defaultState, action: RunAction): RunState {
  switch (action.type) {
    case RunActionTypes.RECEIVE_RUNS:
      return handleReceiveRuns(state, action);
    case RunActionTypes.RECEIVE_RUN_UPDATE:
      return handleReceiveRunUpdate(state, action);
    case RunActionTypes.RUN_UPDATE_HANDLED:
      return handleRunUpdateHandled(state, action);
  }

  return state;
}
