const Endpoints = {
  INTERVIEWS: "/interviews",
  INTERVIEW: (id: string) => `/interviews/${id}`,
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
  SCHEDULE_ENTRIES: (id: string) => `/schedules/${id}/entries`,
  SCHEDULE_ENTRY: (scheduleId: string, entryId: string) =>
    `/schedules/${scheduleId}/entries/${entryId}`,
};

export default Endpoints;
