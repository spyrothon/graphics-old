import * as React from "react";
import { Provider } from "react-redux";

import ThemeProvider from "../graphics/uikit/ThemeProvider";
// import RemoteActionSenderManager from "../modules/remote/RemoteActionSenderManager";
import { store } from "./Store";
import AdminDashboard from "./AdminDashboard";

export default function Dashboards() {
  React.useEffect(() => {
    // RemoteActionSenderManager.init();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AdminDashboard />
      </ThemeProvider>
    </Provider>
  );
}
