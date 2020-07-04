import { commonThunk, denulled } from "../../util/Thunk";
import { Game, GameActionTypes } from "./GameTypes";

type GamesResponse = {
  games: Game[];
};

export function fetchGames(gameIds?: string[]) {
  return commonThunk(
    {
      method: "GET",
      path: "/api/v1/games",
      name: "games",
      query: denulled({
        game_ids: gameIds,
      }),
    },
    (dispatch, response: GamesResponse) => {
      dispatch(receiveGames(response.games));
    },
  );
}

export function fetchGame(gameId: string) {
  return fetchGames([gameId]);
}

export function receiveGames(games: Game[]) {
  return {
    type: GameActionTypes.RECEIVE_GAMES,
    data: {
      games,
    },
  };
}
