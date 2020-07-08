import { OmnibarAction, OmnibarActionTypes } from "./OmnibarTypes";

import { ActionFor } from "../../Actions";

type OmnibarState = {
  highlightedTeamId?: string;
};

const defaultState: OmnibarState = {
  highlightedTeamId: undefined,
};

function handleOmniSetHighlightedTeam(
  state: OmnibarState,
  { data }: ActionFor<"OMNI_SET_HIGHLIGHTED_TEAM">,
) {
  const { teamId } = data;

  return {
    ...state,
    highlightedTeamId: teamId,
  };
}

export function omnibarReducer(state = defaultState, action: OmnibarAction): OmnibarState {
  switch (action.type) {
    case OmnibarActionTypes.OMNI_SET_HIGHLIGHTED_TEAM:
      return handleOmniSetHighlightedTeam(state, action);
  }

  return state;
}
