import { RunInfoActionType } from "./RunInfoTypes";
import { ActionFor, Action } from "../../Actions";

type RunInfoReducerState = {
  gameName: string;
};

function handleSetGameName(
  state: RunInfoReducerState,
  action: ActionFor<RunInfoActionType.RUN_INFO_SET_GAME_NAME>,
) {
  const { gameName } = action;

  return {
    ...state,
    gameName,
  };
}

const defaultState = {
  gameName: "",
};

export default function runInfoReducer(state: RunInfoReducerState = defaultState, action: Action) {
  switch (action.type) {
    case RunInfoActionType.RUN_INFO_SET_GAME_NAME:
      return handleSetGameName(state, action);
  }

  return state;
}
