import createCachedSelector from "re-reselect";
import _ from "lodash";

import { getCurrentTime } from "../timers/TimerStore";
import { Event } from "../events/EventTypes";

import { EventStates } from "../../Constants";
import { timeFromISO } from "../../Util";
import { StoreState, getProp } from "../../Store";

export const getEvents = (state: StoreState) => Object.values(state.events.events);
export const getEvent = (state: StoreState, props: { eventId: string }) =>
  state.events && state.events[props.eventId];

export const getEventStartTime = createCachedSelector(
  [getEvent],
  (event: Event) => event.actual_start_time,
)(getProp("eventId"));

export const getEventTimeSeconds = createCachedSelector(
  [getEvent, getCurrentTime],
  (event, currentTime) => {
    const { actual_start_time, actual_time_seconds } = event;

    if (actual_time_seconds) {
      return actual_time_seconds;
    } else if (actual_start_time == null) {
      return 0;
    } else if (currentTime != null) {
      const elapsed = currentTime.diff(timeFromISO(actual_start_time)).as("seconds");
      return elapsed;
    } else {
      // If currentTime doesn't exist, we can't state elapsed time.
      return 0;
    }
  },
)(getProp("eventId"));

export const getEventState = createCachedSelector([getEvent], (event) => {
  const { actual_start_time, actual_time_seconds } = event;

  if (actual_time_seconds) {
    return EventStates.FINISHED;
  } else if (actual_start_time) {
    return EventStates.STARTED;
  } else {
    return EventStates.READY;
  }
})(getProp("eventId"));
