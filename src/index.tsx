import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

ReactDOM.render(
  <Provider store={store}>
    <div />
  </Provider>,
  document.querySelector("#app-container"),
);
