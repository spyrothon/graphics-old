import * as React from "react";
import * as ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";

import ThemeProvider from "../graphics/uikit/ThemeProvider";
import AdminHelmet from "./AdminHelmet";
import Dashboards from "./Dashboards";
import { store } from "./Store";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <ThemeProvider>
        <AdminHelmet />
        <Dashboards />
      </ThemeProvider>
    </Provider>
  </DndProvider>,
  document.querySelector("#app-container"),
);
