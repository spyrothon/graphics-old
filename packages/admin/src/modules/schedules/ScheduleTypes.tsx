import type { DateTime } from "luxon";
import type { Interview, OBSWebsocketConfig, Run, Schedule, ScheduleEntry } from "@spyrothon/api";

export enum ScheduleActionType {
  SCHEDULES_ENTRY_SELECTED = "SCHEDULES_ENTRY_SELECTED",
  SCHEDULES_ENTRY_DELETED = "SCHEDULES_ENTRY_DELETED",
  SCHEDULES_ENTRY_UPDATED = "SCHEDULES_ENTRY_UPDATED",
  SCHEDULES_FETCH_SCHEDULE_STARTED = "SCHEDULES_FETCH_SCHEDULE_STARTED",
  SCHEDULES_FETCH_SCHEDULE_SUCCESS = "SCHEDULES_FETCH_SCHEDULE_SUCCESS",
  SCHEDULES_FETCH_OBS_STARTED = "SCHEDULES_FETCH_OBS_STARTED",
  SCHEDULES_FETCH_OBS_SUCCESS = "SCHEDULES_FETCH_OBS_SUCCESS",
}

export type ScheduleAction =
  | { type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED; entryId?: string }
  | { type: ScheduleActionType.SCHEDULES_ENTRY_DELETED; entryId?: string }
  | { type: ScheduleActionType.SCHEDULES_ENTRY_UPDATED; entry: ScheduleEntry }
  | { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED }
  | {
      type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS;
      schedule: Schedule;
    }
  | { type: ScheduleActionType.SCHEDULES_FETCH_OBS_STARTED }
  | { type: ScheduleActionType.SCHEDULES_FETCH_OBS_SUCCESS; config: OBSWebsocketConfig };

export interface ScheduleEntryWithTimes extends ScheduleEntry {
  estimatedStartTime: DateTime;
  actualStartTime: DateTime;
}

export interface ScheduleEntryWithDependants extends ScheduleEntry {
  run?: Run;
  interview?: Interview;
}
