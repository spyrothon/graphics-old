import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { SessionToken } from "../APITypes";

export async function login(name: string, password: string) {
  return await HTTPUtils.post<SessionToken>(Endpoints.AUTH_LOGIN, { name, password });
}

export async function logout() {
  return await HTTPUtils.delete(Endpoints.AUTH_LOGOUT);
}
