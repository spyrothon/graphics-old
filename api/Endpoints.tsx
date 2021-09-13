const Endpoints = {
  INIT: "/init",
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",
  INTERVIEWS: "/interviews",
  INTERVIEW: (id: string) => `/interviews/${id}`,
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
  RUN_START: (id: string) => `/runs/${id}/start`,
  RUN_FINISH: (id: string) => `/runs/${id}/finish`,
  RUN_PAUSE: (id: string) => `/runs/${id}/pause`,
  RUN_RESUME: (id: string) => `/runs/${id}/resume`,
  RUN_RESET: (id: string) => `/runs/${id}/reset`,
  RUN_PARTICIPANT_FINISH: (id: string, participantId: string) =>
    `/runs/${id}/finish-participant/${participantId}`,
  RUN_PARTICIPANT_RESUME: (id: string, participantId: string) =>
    `/runs/${id}/resume-participant/${participantId}`,
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
  SCHEDULE_ENTRIES: (id: string) => `/schedules/${id}/entries`,
  SCHEDULE_ENTRY: (scheduleId: string, entryId: string) =>
    `/schedules/${scheduleId}/entries/${entryId}`,
  SCHEDULE_SET_CURRENT_ENTRY: (id: string) => `/schedules/${id}/set-current-entry`,
  SCHEDULE_OBS_CONFIG: (id: string) => `/schedules/${id}/obs`,
};

export default Endpoints;
