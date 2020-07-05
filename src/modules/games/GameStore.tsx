import _ from "lodash";

import { StoreState } from "../../Store";

export const getGames = (state: StoreState) => Object.values(state.games);
export const getGame = (state: StoreState, props: { gameId: string }) => state.games[props.gameId];
