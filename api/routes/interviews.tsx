import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { Interview, InitialInterview } from "../APITypes";

export async function fetchInterviews() {
  return await HTTPUtils.get<Interview[]>(Endpoints.INTERVIEWS);
}

export async function fetchInterview(interviewId: string) {
  return await HTTPUtils.get<Interview>(Endpoints.INTERVIEW(interviewId));
}

export async function createInterview(interview: InitialInterview) {
  return await HTTPUtils.post<Interview>(Endpoints.INTERVIEWS, interview);
}

export async function updateInterview(interviewId: string, interview: Interview) {
  return await HTTPUtils.put<Interview>(Endpoints.INTERVIEW(interviewId), interview);
}

export async function deleteInterview(interviewId: string) {
  return await HTTPUtils.delete(Endpoints.INTERVIEW(interviewId));
}
