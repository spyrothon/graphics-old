import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <ThemeProvider>
          <AdminDashboard />
        </ThemeProvider>
      </Provider>
    </DndProvider>
  );
}
