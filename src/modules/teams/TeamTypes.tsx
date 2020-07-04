import { DateTime } from "luxon";

export type Team = {
  id: string;
  name: string;
  color: string;
  slug?: string;
  runs?: any[];
  actual_start_time?: DateTime;
  actual_end_time?: DateTime;
  actual_time_seconds?: number;
  captain_id: string;
  event_id: string;
};

export enum TeamActionTypes {
  RECEIVE_TEAMS = "RECEIVE_TEAMS",
}

export type TeamAction = { type: "RECEIVE_TEAMS"; data: { teams: Team[] } };
