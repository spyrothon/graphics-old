import { DateTime } from "luxon";

export type Series = {
  id: string;
  name: string;
  description: string;
};

export type Event = {
  id: string;
  summary: string;
  signups_open_time: DateTime;
  signups_closed_time: DateTime;
  runners_announced_time: DateTime;
  start_time: DateTime;
  end_time: DateTime;
  series?: Series;
  series_id: string;
  start_time_is_estimate: boolean;
  end_time_is_estimate: boolean;
  state: "created" | "teams announced" | "completed" | "signups open" | "signups closed";
};

export enum EventActionTypes {
  RECEIVE_EVENTS = "RECEIVE_EVENTS",
}

export type EventAction = { type: "RECEIVE_EVENTS"; data: { events: Event[] } };
