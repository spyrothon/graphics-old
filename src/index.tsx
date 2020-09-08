import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

import Standard1 from "./layouts/standard/Standard1";

ReactDOM.render(
  <Provider store={store}>
    <Standard1 />
  </Provider>,
  document.querySelector("#app-container"),
);
