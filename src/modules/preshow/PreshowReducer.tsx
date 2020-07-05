import { PreshowAction, PreshowActionTypes } from "./PreshowTypes";

import { ActionFor } from "../../Actions";

type PreshowState = {
  activeOverlay: object;
};

const defaultState: PreshowState = { activeOverlay: {} };

function handlePreshowSetOverlay(state: PreshowState, { data }: ActionFor<"PRESHOW_SET_OVERLAY">) {
  return {
    ...state,
    activeOverlay: {
      ...data,
    },
  };
}

export function preshowReducer(state = defaultState, action: PreshowAction): PreshowState {
  switch (action.type) {
    case PreshowActionTypes.PRESHOW_SET_OVERLAY:
      return handlePreshowSetOverlay(state, action);
  }

  return state;
}
