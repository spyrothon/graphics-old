import { InitAction, InitActionTypes } from "./InitTypes";

import { ActionFor } from "../../Actions";

type InitState = {
  ready: boolean;
};

const defaultState: InitState = { ready: false };

function handleDataReady(state: InitState, _action: ActionFor<"DATA_READY">) {
  return {
    ...state,
    ready: true,
  };
}

export function initReducer(state = defaultState, action: InitAction): InitState {
  switch (action.type) {
    case InitActionTypes.DATA_READY:
      return handleDataReady(state, action);
  }

  return state;
}
