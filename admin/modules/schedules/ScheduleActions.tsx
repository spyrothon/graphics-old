import APIClient from "../../../api/APIClient";
import { Schedule } from "../../../api/APITypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleActionType, ScheduleAction } from "./ScheduleTypes";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
  };
}

export function fetchSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED });
    const scheduleResponse = await APIClient.fetchSchedule(scheduleId);
    const { runs, ...schedule } = scheduleResponse;

    dispatch(loadSchedule(schedule));
    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadSchedule(schedule: Schedule): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS, schedule };
}
