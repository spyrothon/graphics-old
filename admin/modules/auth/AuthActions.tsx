import Cookies from "js-cookie";

import { SafeDispatch } from "../../hooks/useDispatch";
import { AUTH_KEY, AuthActionType, AuthAction } from "./AuthTypes";

const AUTH_COOKIE_ID = "spyrothon_basic_auth";

export function login(userName: string, password: string) {
  return async (dispatch: SafeDispatch) => {
    if (password !== AUTH_KEY) return;

    Cookies.set(AUTH_COOKIE_ID, btoa(userName), { sameSite: "strict" });

    dispatch({
      type: AuthActionType.AUTH_LOGIN,
      userName,
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
      userName: atob(cookie),
    });
  };
}
