export type Stream = {
  id: string;
};

export enum StreamActionTypes {
  RECEIVE_STREAMS = "RECEIVE_STREAMS",
}

export type StreamAction = { type: "RECEIVE_STREAMS"; data: { streams: { [id: string]: Stream } } };
