import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { Run, InitialRun } from "../APITypes";

export async function fetchRuns() {
  return await HTTPUtils.get<Run[]>(Endpoints.RUNS);
}

export async function fetchRun(runId: string) {
  return await HTTPUtils.get<Run>(Endpoints.RUN(runId));
}

export async function createRun(runData: InitialRun) {
  return await HTTPUtils.post<Run>(Endpoints.RUNS, runData);
}

export async function updateRun(runId: string, runData: Partial<Run>) {
  return await HTTPUtils.put<Run>(Endpoints.RUN(runId), runData);
}

export async function deleteRun(runId: string) {
  return await HTTPUtils.delete(Endpoints.RUN(runId));
}
