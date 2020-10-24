import APIClient from "../../../api/APIClient";
import { Schedule } from "../../../api/APITypes";
import { SafeDispatch } from "../../hooks/useDispatch";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleActionType, ScheduleAction } from "./ScheduleTypes";
import { fetchInterviewsSuccess } from "../interviews/InterviewActions";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
  };
}

export function addRunToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await APIClient.createRun({ gameName: "New Run" });
    dispatch(fetchRunsSuccess([run]));
    const updatedSchedule = await APIClient.addScheduleEntry(scheduleId, { runId: run.id });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function addInterviewToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const interview = await APIClient.createInterview({ topic: "New Interview" });
    dispatch(fetchInterviewsSuccess([interview]));
    const updatedSchedule = await APIClient.addScheduleEntry(scheduleId, {
      interviewId: interview.id,
    });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function fetchSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED });
    const scheduleResponse = await APIClient.fetchSchedule(scheduleId);
    const { runs, interviews, ...schedule } = scheduleResponse;

    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadSchedule(schedule: Schedule): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS, schedule };
}
