import { createSelector } from "reselect";

import { StoreState } from "../../Store";

const getRemoteState = (globalState: StoreState) => globalState.remote;

export const isRemoteConnected = createSelector([getRemoteState], (state) => state.connected);
