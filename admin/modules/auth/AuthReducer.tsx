import { SessionToken } from "../../../api/APITypes";

import { ActionFor, Action } from "../../Actions";
import { AuthActionType } from "./AuthTypes";

type AuthReducerState = {
  authenticated: boolean;
  userName?: string;
  token?: SessionToken;
};

function handleLogin(state: AuthReducerState, action: ActionFor<AuthActionType.AUTH_LOGIN>) {
  const { userName, token } = action;
  return {
    ...state,
    authenticated: true,
    userName,
    token,
  };
}

function handleLogout(state: AuthReducerState, _action: ActionFor<AuthActionType.AUTH_LOGOUT>) {
  return {
    ...state,
    authenticated: false,
    userName: undefined,
    token: undefined,
  };
}

const defaultState = {
  authenticated: false,
};

export default function authenticationReducer(
  state: AuthReducerState = defaultState,
  action: Action,
): AuthReducerState {
  switch (action.type) {
    case AuthActionType.AUTH_LOGIN:
      return handleLogin(state, action);
    case AuthActionType.AUTH_LOGOUT:
      return handleLogout(state, action);
  }

  return state;
}
