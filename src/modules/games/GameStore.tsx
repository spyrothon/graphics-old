import { Game, GameAction, GameActionTypes } from "./GameTypes";

import { ActionFor } from "../../Actions";

type GameState = {
  [id: string]: Game;
};

const defaultState: GameState = {};

function handleReceiveGames(state: GameState, { data }: ActionFor<"RECEIVE_GAMES">) {
  const { games } = data;
  const gamesById = games.reduce((acc, game) => {
    // @ts-ignore
    acc[game.id] = game;
    return acc;
  }, {});

  return {
    ...state,
    ...gamesById,
  };
}

export function gamesReducer(state = defaultState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionTypes.RECEIVE_GAMES:
      return handleReceiveGames(state, action);
  }

  return state;
}
