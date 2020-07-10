import { StoreState } from "../../Store";

export const isReady = (state: StoreState) => state.init?.ready === true;
