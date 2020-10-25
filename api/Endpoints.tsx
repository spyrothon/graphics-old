const Endpoints = {
  INTERVIEWS: "/interviews",
  INTERVIEW: (id: string) => `/interviews/${id}`,
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
  SCHEDULE_ADD_ENTRY: (id: string) => `/schedules/${id}/add-entry`,
  SCHEDULE_REMOVE_ENTRY: (scheduleId: string, entryId: string) =>
    `/schedules/${scheduleId}/entries/${entryId}`,
};

export default Endpoints;
