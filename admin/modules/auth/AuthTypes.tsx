import { SessionToken } from "../../../api/APITypes";

export enum AuthActionType {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}

export type AuthAction =
  | { type: AuthActionType.AUTH_LOGIN; userName: string; token: SessionToken }
  | { type: AuthActionType.AUTH_LOGOUT };
