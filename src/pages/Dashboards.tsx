import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../Store";
import AdminDashboard from "../dashboards/AdminDashboard";
import RemoteActionSenderManager from "../modules/remote/RemoteActionSenderManager";
import ThemeProvider from "../uikit/ThemeProvider";

export default function Dashboards() {
  React.useEffect(() => {
    RemoteActionSenderManager.init();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AdminDashboard />
      </ThemeProvider>
    </Provider>
  );
}
