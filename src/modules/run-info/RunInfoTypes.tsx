export enum RunInfoActionType {
  RUN_INFO_SET_GAME_NAME = "RUN_INFO_SET_GAME_NAME",
}

export type RunInfoAction = {
  type: RunInfoActionType.RUN_INFO_SET_GAME_NAME;
  gameName: string;
};
