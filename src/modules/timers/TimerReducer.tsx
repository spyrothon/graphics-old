import { DateTime } from "luxon";

import { TimerAction, TimerActionTypes } from "./TimerTypes";

import { ActionFor } from "../../Actions";

type TimerState = {
  tick: number;
  currentTime: string;
};

const defaultState: TimerState = { tick: 0, currentTime: DateTime.utc().toISO() };

function handleTimerTick(state: TimerState, { data }: ActionFor<"TIMER_TICK">) {
  const { currentTime } = data;
  return {
    ...state,
    tick: state.tick + 1,
    currentTime,
  };
}

export function timerReducer(state = defaultState, action: TimerAction): TimerState {
  switch (action.type) {
    case TimerActionTypes.TIMER_TICK:
      return handleTimerTick(state, action);
  }

  return state;
}
