import "./style/reset.css";
import "./style/theme.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./pages/app";
import PreShow from "./pages/pre-show";
import StateSync from "./pages/state-sync";

import { store } from "./Store";

import Admin from "./admin/admin";
import { adminStore } from "./admin/reducer";

if (window.location.pathname === "/admin") {
  ReactDOM.render(
    <Provider store={adminStore}>
      <Admin />
    </Provider>,
    document.querySelector("#app-container"),
  );
} else if (window.location.pathname === "/preshow") {
  ReactDOM.render(
    <Provider store={store}>
      <PreShow />
    </Provider>,
    document.querySelector("#app-container"),
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App />
      <StateSync />
    </Provider>,
    document.querySelector("#app-container"),
  );
}
