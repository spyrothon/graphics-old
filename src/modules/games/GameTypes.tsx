export type Game = {
  id: string;
  name: string;
  series: string;
  progress_unit: string;
  progress_max: string;
  sequence_number: number;
  twitch_id: string;
};

export enum GameActionTypes {
  RECEIVE_GAMES = "RECEIVE_GAMES",
}

export type GameAction = { type: "RECEIVE_GAMES"; data: { games: Game[] } };
