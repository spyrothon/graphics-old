import * as React from "react";
import * as ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";

import ThemeProvider from "../graphics/uikit/ThemeProvider";
import App from "./App";
import { store } from "./Store";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </DndProvider>,
  document.querySelector("#app-container"),
);
