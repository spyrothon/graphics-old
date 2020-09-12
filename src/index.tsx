import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

import AdminDashboard from "./dashboards/AdminDashboard";
import Standard1 from "./layouts/standard/Standard1";
import SVGLibrary from "./uikit/svg/SVGLibrary";
import RemoteSyncReceiverManager from "./modules/remote/RemoteSyncReceiverManager";
import RemoteSyncSenderManager from "./modules/remote/RemoteSyncSenderManager";
import ThemeProvider from "./uikit/ThemeProvider";

switch (window.location.pathname) {
  case "/admin":
    RemoteSyncSenderManager.init();
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider>
          <AdminDashboard />
        </ThemeProvider>
      </Provider>,
      document.querySelector("#app-container"),
    );
    break;

  default:
    RemoteSyncReceiverManager.init();
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider>
          <SVGLibrary />
          <Standard1 />
        </ThemeProvider>
      </Provider>,
      document.querySelector("#app-container"),
    );
}
