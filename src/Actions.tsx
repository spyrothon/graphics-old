import _ from "lodash";

import { AccountActionTypes, AccountAction } from "./modules/accounts/AccountTypes";
import { EventActionTypes, EventAction } from "./modules/events/EventTypes";
import { FetchingActionTypes, FetchingAction } from "./modules/fetching/FetchingTypes";
import { GameActionTypes, GameAction } from "./modules/games/GameTypes";
import { InitAction, InitActionTypes } from "./modules/init/InitTypes";
import { RunAction, RunActionTypes } from "./modules/runs/RunTypes";
import { PreshowAction, PreshowActionTypes } from "./modules/preshow/PreshowTypes";
import { SocketActionTypes, SocketAction } from "./modules/socket/SocketTypes";
import { StreamActionTypes, StreamAction } from "./modules/streams/StreamTypes";
import { TeamActionTypes, TeamAction } from "./modules/teams/TeamTypes";
import { TimerActionTypes, TimerAction } from "./modules/timers/TimerTypes";
import { OmnibarActionTypes, OmnibarAction } from "./modules/omnibar/OmnibarTypes";
import {
  StreamRotationActionTypes,
  StreamRotationAction,
} from "./modules/stream_rotation/StreamRotationTypes";

export const ActionTypes = {
  ...AccountActionTypes,
  ...EventActionTypes,
  ...FetchingActionTypes,
  ...GameActionTypes,
  ...InitActionTypes,
  ...OmnibarActionTypes,
  ...PreshowActionTypes,
  ...RunActionTypes,
  ...SocketActionTypes,
  ...StreamActionTypes,
  ...StreamRotationActionTypes,
  ...TeamActionTypes,
  ...TimerActionTypes,
};

export type Action =
  | AccountAction
  | EventAction
  | FetchingAction
  | GameAction
  | InitAction
  | OmnibarAction
  | PreshowAction
  | RunAction
  | SocketAction
  | StreamAction
  | StreamRotationAction
  | TeamAction
  | TimerAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
