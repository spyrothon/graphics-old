import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";
import Graphics from "./pages/Graphics";
import ThemeProvider from "./uikit/ThemeProvider";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Graphics />
    </ThemeProvider>
  </Provider>,
  document.querySelector("#app-container"),
);
