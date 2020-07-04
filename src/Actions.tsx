import _ from "lodash";

import { AccountActionTypes, AccountAction } from "./modules/accounts/AccountTypes";
import { EventActionTypes, EventAction } from "./modules/events/EventTypes";
import { FeaturedRunAction, FeaturedRunActionTypes } from "./modules/featured_run/FeaturedRunTypes";
import { FetchingActionTypes, FetchingAction } from "./modules/fetching/FetchingTypes";
import { GameActionTypes, GameAction } from "./modules/games/GameTypes";
import { InitAction, InitActionTypes } from "./modules/init/InitTypes";
import { RunAction, RunActionTypes } from "./modules/runs/RunTypes";
import { PreshowAction, PreshowActionTypes } from "./modules/preshow/PreshowTypes";
import { SocketActionTypes, SocketAction } from "./modules/socket/SocketTypes";
import { StreamActionTypes, StreamAction } from "./modules/streams/StreamTypes";
import { TeamActionTypes, TeamAction } from "./modules/teams/TeamTypes";
import { TimerActionTypes, TimerAction } from "./modules/timers/TimerTypes";

export const ActionTypes = {
  ...AccountActionTypes,
  ...EventActionTypes,
  ...FeaturedRunActionTypes,
  ...FetchingActionTypes,
  ...GameActionTypes,
  ...InitActionTypes,
  ...PreshowActionTypes,
  ...RunActionTypes,
  ...SocketActionTypes,
  ...StreamActionTypes,
  ...TeamActionTypes,
  ...TimerActionTypes,
};

export type Action =
  | AccountAction
  | EventAction
  | FeaturedRunAction
  | FetchingAction
  | GameAction
  | InitAction
  | PreshowAction
  | RunAction
  | SocketAction
  | StreamAction
  | TeamAction
  | TimerAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
