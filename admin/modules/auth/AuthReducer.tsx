import { SessionToken, User } from "../../../api/APITypes";

import { ActionFor, Action } from "../../Actions";
import { AuthActionType } from "./AuthTypes";

type AuthReducerState = {
  authenticated: boolean;
  user?: User;
  token?: SessionToken;
};

function handleLogin(state: AuthReducerState, action: ActionFor<AuthActionType.AUTH_LOGIN>) {
  const { token } = action;
  return {
    ...state,
    authenticated: true,
    token,
  };
}

function handleLogout(state: AuthReducerState, _action: ActionFor<AuthActionType.AUTH_LOGOUT>) {
  return {
    ...state,
    authenticated: false,
    user: undefined,
    token: undefined,
  };
}

function handleUpdateMe(state: AuthReducerState, action: ActionFor<AuthActionType.AUTH_UPDATE_ME>) {
  const { user } = action;

  return {
    ...state,
    user,
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
    case AuthActionType.AUTH_UPDATE_ME:
      return handleUpdateMe(state, action);
  }

  return state;
}
