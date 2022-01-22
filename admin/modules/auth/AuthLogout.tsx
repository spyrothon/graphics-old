import * as React from "react";

import useSafeDispatch from "@admin/hooks/useDispatch";
import RouterUtils from "@common/router/RouterUtils";
import Anchor from "@uikit/Anchor";
import { Routes } from "../../Constants";
import { logout } from "./AuthActions";

export default function AuthLogout() {
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    dispatch(logout());
    RouterUtils.navigateTo(Routes.BASE_PATH);
  }, []);

  return <Anchor onClick={() => RouterUtils.navigateTo(Routes.BASE_PATH)}>Go Home</Anchor>;
}
