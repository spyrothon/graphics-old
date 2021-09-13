import Cookies from "js-cookie";

import { SafeDispatch } from "../../hooks/useDispatch";
import { AuthActionType, AuthAction } from "./AuthTypes";
import APIClient from "../../../api/APIClient";

const AUTH_COOKIE_ID = "session";

export function login(userName: string, password: string) {
  return async (dispatch: SafeDispatch) => {
    const token = await APIClient.login(userName, password);

    Cookies.set(AUTH_COOKIE_ID, btoa(JSON.stringify(token)), { sameSite: "strict" });

    dispatch({
      type: AuthActionType.AUTH_LOGIN,
      userName,
      token,
    });
  };
}

export function logout(): AuthAction {
  Cookies.remove(AUTH_COOKIE_ID);
  return {
    type: AuthActionType.AUTH_LOGOUT,
  };
}

export function loadSession() {
  return async (dispatch: SafeDispatch) => {
    const cookie = Cookies.get(AUTH_COOKIE_ID);
    if (cookie == null) return;

    dispatch({
      type: AuthActionType.AUTH_LOGIN,
      token: JSON.parse(atob(cookie)),
    });
  };
}
