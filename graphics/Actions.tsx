import { RemoteAction, RemoteActionType } from "./modules/remote/RemoteTypes";
import { RunInfoAction, RunInfoActionType } from "./modules/run-info/RunInfoTypes";

export const ActionTypes = {
  ...RemoteActionType,
  ...RunInfoActionType,
};

export type Action = { type: "@@INIT" } | RemoteAction | RunInfoAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
