import { RunInfoAction, RunInfoActionType } from "./RunInfoTypes";

export function updateGameName(gameName: string): RunInfoAction {
  return {
    type: RunInfoActionType.RUN_INFO_SET_GAME_NAME,
    gameName,
  };
}
