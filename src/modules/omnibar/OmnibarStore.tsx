import { StoreState } from "../../Store";

export const getOmnibarState = (state: StoreState) => state.omnibar;
export const getHighlightedTeamId = (state: StoreState) => state.omnibar.highlightedTeamId;
