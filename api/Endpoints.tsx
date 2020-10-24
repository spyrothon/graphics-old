const Endpoints = {
  INTERVIEWS: "/interviews",
  INTERVIEW: (id: string) => `/interviews/${id}`,
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
};

export default Endpoints;
