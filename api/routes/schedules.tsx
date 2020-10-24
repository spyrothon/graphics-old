import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { Schedule, ScheduleResponse } from "../APITypes";

export async function fetchSchedule(scheduleId: string) {
  return await HTTPUtils.get<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId));
}

export async function createSchedule(schedule: Schedule) {
  return await HTTPUtils.post<ScheduleResponse>(Endpoints.SCHEDULES, schedule);
}

export async function updateSchedule(scheduleId: string, schedule: Schedule) {
  return await HTTPUtils.put<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId), schedule);
}

export async function deleteSchedule(scheduleId: string) {
  return await HTTPUtils.delete<void>(Endpoints.SCHEDULE(scheduleId));
}
