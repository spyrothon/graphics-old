import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

import Standard1 from "./layouts/standard/Standard1";
import SVGLibrary from "./uikit/svg/SVGLibrary";

ReactDOM.render(
  <Provider store={store}>
    <SVGLibrary />
    <Standard1 />
  </Provider>,
  document.querySelector("#app-container"),
);
