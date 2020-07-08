import "./style/reset.css";
import "./style/theme.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./pages/App";
import StateSync from "./modules/socket/StateSync";

import { store } from "./Store";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <StateSync />
  </Provider>,
  document.querySelector("#app-container"),
);
