import { Event as EventEvent, EventAction, EventActionTypes } from "./EventTypes";

import { ActionFor } from "../../Actions";

type EventState = {
  [id: string]: EventEvent;
};

const defaultState: EventState = {};

function handleReceiveEvents(state: EventState, { data }: ActionFor<"RECEIVE_EVENTS">) {
  const { events } = data;
  const eventsById = events.reduce((acc, event) => {
    // @ts-ignore
    acc[event.id] = event;
    return acc;
  }, {});

  return {
    ...state,
    ...eventsById,
  };
}

export function eventsReducer(state = defaultState, action: EventAction): EventState {
  switch (action.type) {
    case EventActionTypes.RECEIVE_EVENTS:
      return handleReceiveEvents(state, action);
  }

  return state;
}
