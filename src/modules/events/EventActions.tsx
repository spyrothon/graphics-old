import { commonThunk, denulled } from "../../util/Thunk";
import { Event, EventActionTypes } from "./EventTypes";

type EventsResponse = {
  events: Event[];
};

export function fetchEvents(eventIds?: string[]) {
  return commonThunk(
    {
      method: "GET",
      path: "/api/v1/events",
      name: "events",
      query: denulled({
        event_ids: eventIds,
      }),
    },
    (dispatch, response: EventsResponse) => {
      dispatch(receiveEvents(response.events));
    },
  );
}

export function fetchEvent(eventId: string) {
  return fetchEvents([eventId]);
}

export function receiveEvents(events: Event[]) {
  return {
    type: EventActionTypes.RECEIVE_EVENTS,
    data: {
      events,
    },
  };
}
