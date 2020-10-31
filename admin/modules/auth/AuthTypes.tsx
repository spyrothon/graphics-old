// Yep. This is just so the page isn't directly public.
export const AUTH_KEY = "yesthisissecure";

export enum AuthActionType {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}

export type AuthAction =
  | { type: AuthActionType.AUTH_LOGIN; userName: string }
  | { type: AuthActionType.AUTH_LOGOUT };
