export type Series = {
  id: string;
  name: string;
  description: string;
};

export type Event = {
  id: string;
  summary: string;
  signups_open_time: string;
  signups_closed_time: string;
  runners_announced_time: string;
  start_time: string;
  end_time: string;
  series?: Series;
  series_id: string;
  start_time_is_estimate: boolean;
  end_time_is_estimate: boolean;
  actual_start_time?: string;
  actual_end_time?: string;
  actual_time_seconds?: number;
  state: "created" | "teams announced" | "completed" | "signups open" | "signups closed";
};

export enum EventActionTypes {
  RECEIVE_EVENTS = "RECEIVE_EVENTS",
}

export type EventAction = { type: "RECEIVE_EVENTS"; data: { events: Event[] } };
