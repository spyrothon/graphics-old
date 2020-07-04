import { DateTime } from "luxon";

import { SafeDispatch } from "../../hooks/useDispatch";
import { TimerActionTypes } from "./TimerTypes";

let intervalID: number | undefined = undefined;

export function startTimers(dispatch: SafeDispatch, interval = 1000) {
  intervalID = window.setInterval(() => {
    dispatch(tick(DateTime.utc().toISO()));
  }, interval);
}

export function stopTimers() {
  window.clearInterval(intervalID);
  intervalID = undefined;
}

export function tick(currentTime: string) {
  return {
    type: TimerActionTypes.TIMER_TICK,
    data: {
      currentTime,
    },
  };
}
