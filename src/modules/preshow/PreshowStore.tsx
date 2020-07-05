import { createSelector } from "reselect";
import _ from "lodash";

import { StoreState } from "../../Store";

const getPreshow = (state: StoreState) => state.preshow;

export const getActiveOverlay = createSelector([getPreshow], (preshow) => preshow.activeOverlay);
