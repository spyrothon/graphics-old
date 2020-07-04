import { Stream, StreamAction, StreamActionTypes } from "./StreamTypes";

import { ActionFor } from "../../Actions";

type StreamState = {
  [id: string]: Stream;
};

const defaultState: StreamState = {};

function handleReceiveStreams(state: StreamState, { data }: ActionFor<"RECEIVE_STREAMS">) {
  const { streams } = data;

  return {
    ...state,
    ...streams,
  };
}

export function streamsReducer(state = defaultState, action: StreamAction): StreamState {
  switch (action.type) {
    case StreamActionTypes.RECEIVE_STREAMS:
      return handleReceiveStreams(state, action);
  }

  return state;
}
