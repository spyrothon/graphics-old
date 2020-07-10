import { OmnibarActionTypes } from "./OmnibarTypes";

export function setHighlightedTeam(teamId?: string) {
  return {
    type: OmnibarActionTypes.OMNI_SET_HIGHLIGHTED_TEAM,
    data: { teamId },
  };
}
