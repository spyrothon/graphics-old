import * as React from "react";

import { Routes } from "../../Constants";
import useSafeDispatch from "../../hooks/useDispatch";
import Anchor from "../../uikit/Anchor";
import RouterUtils from "../router/RouterUtils";
import { logout } from "./AuthActions";

export default function AuthLogout() {
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(logout());
    RouterUtils.navigateTo(Routes.BASE_PATH);
  }, []);

  return <Anchor onClick={() => RouterUtils.navigateTo(Routes.BASE_PATH)}>Go Home</Anchor>;
}
