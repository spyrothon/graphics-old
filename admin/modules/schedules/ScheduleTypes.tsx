import { Schedule } from "../../../api/APITypes";

export enum ScheduleActionType {
  SCHEDULES_ENTRY_SELECTED = "SCHEDULES_ENTRY_SELECTED",
  SCHEDULES_ENTRY_DELETED = "SCHEDULES_ENTRY_DELETED",
  SCHEDULES_FETCH_SCHEDULE_STARTED = "SCHEDULES_FETCH_SCHEDULE_STARTED",
  SCHEDULES_FETCH_SCHEDULE_SUCCESS = "SCHEDULES_FETCH_SCHEDULE_SUCCESS",
}

export type ScheduleAction =
  | { type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED; entryId?: string }
  | { type: ScheduleActionType.SCHEDULES_ENTRY_DELETED; entryId?: string }
  | { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED }
  | {
      type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS;
      schedule: Schedule;
    };
