import { SessionToken, User } from "@api/APITypes";

export enum AuthActionType {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
  AUTH_UPDATE_ME = "AUTH_UPDATE_ME",
}

export type AuthAction =
  | { type: AuthActionType.AUTH_LOGIN; token: SessionToken }
  | { type: AuthActionType.AUTH_LOGOUT }
  | { type: AuthActionType.AUTH_UPDATE_ME; user: User };
