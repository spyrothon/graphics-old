const Endpoints = {
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
};

export default Endpoints;
