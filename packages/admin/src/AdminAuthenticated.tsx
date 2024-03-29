import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AuthStore from "./modules/auth/AuthStore";
import SyncSocketManager from "./modules/sync/SyncSocketManager";
import AdminHelmet from "./AdminHelmet";
import { Routes } from "./Constants";
import { useSafeSelector } from "./Store";

export default function Dashboards() {
  const navigate = useNavigate();
  const isLoggedIn = useSafeSelector((state) => AuthStore.isLoggedIn(state));

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate(Routes.LOGIN, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    SyncSocketManager.init();
    return () => SyncSocketManager.stop();
  }, []);

  return (
    <>
      <AdminHelmet />
      <Outlet />
    </>
  );
}
