import { commonThunk } from "../../util/Thunk";
import { Stream, StreamActionTypes } from "./StreamTypes";

type StreamsResponse = {
  streams: { [id: string]: Stream };
};

export function fetchStreams() {
  return commonThunk(
    {
      method: "GET",
      path: "/api/v1/streams",
      name: "streams",
    },
    (dispatch, response: StreamsResponse) => {
      dispatch(receiveStreams(response.streams));
    },
  );
}

type StreamResponse = {
  stream: Stream;
};

export function fetchStream(accountId: string) {
  return commonThunk(
    {
      method: "GET",
      path: `/api/v1/streams/${accountId}`,
      name: `streams.${accountId}`,
    },
    (dispatch, response: StreamResponse) => {
      dispatch(receiveStreams({ [accountId]: response.stream }));
    },
  );
}

export function receiveStreams(streams: { [id: string]: Stream }) {
  return {
    type: StreamActionTypes.RECEIVE_STREAMS,
    data: {
      streams,
    },
  };
}
