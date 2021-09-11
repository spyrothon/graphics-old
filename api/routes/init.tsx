import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { InitPayload } from "../APITypes";

export async function fetchInit() {
  return await HTTPUtils.get<InitPayload>(Endpoints.INIT);
}

export async function updateInit(payload: InitPayload) {
  return await HTTPUtils.post<InitPayload>(Endpoints.INIT, payload);
}
