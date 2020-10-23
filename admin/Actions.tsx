import { RemoteAction, RemoteActionType } from "./modules/remote/RemoteTypes";
import { RunAction, RunActionType } from "./modules/runs/RunsTypes";

export const ActionTypes = {
  ...RemoteActionType,
  ...RunActionType,
};

export type Action = { type: "@@INIT" } | RemoteAction | RunAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
