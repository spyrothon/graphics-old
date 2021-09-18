import { AuthAction, AuthActionType } from "./modules/auth/AuthTypes";
import { InterviewAction, InterviewActionType } from "./modules/interviews/InterviewTypes";
import { ScheduleAction, ScheduleActionType } from "./modules/schedules/ScheduleTypes";
import { RemoteAction, RemoteActionType } from "./modules/remote/RemoteTypes";
import { RunAction, RunActionType } from "./modules/runs/RunsTypes";

export const ActionTypes = {
  ...AuthActionType,
  ...InterviewActionType,
  ...ScheduleActionType,
  ...RemoteActionType,
  ...RunActionType,
};

export type Action =
  | { type: "@@INIT" }
  | AuthAction
  | InterviewAction
  | ScheduleAction
  | RemoteAction
  | RunAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
