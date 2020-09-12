import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

import AdminDashboard from "./dashboards/admin";
import Standard1 from "./layouts/standard/Standard1";
import SVGLibrary from "./uikit/svg/SVGLibrary";
import RemoteSyncReceiverManager from "./modules/remote/RemoteSyncReceiverManager";
import RemoteSyncSenderManager from "./modules/remote/RemoteSyncSenderManager";

switch (window.location.pathname) {
  case "/admin":
    RemoteSyncSenderManager.init();
    ReactDOM.render(
      <Provider store={store}>
        <AdminDashboard />
      </Provider>,
      document.querySelector("#app-container"),
    );
    break;

  default:
    RemoteSyncReceiverManager.init();
    ReactDOM.render(
      <Provider store={store}>
        <SVGLibrary />
        <Standard1 />
      </Provider>,
      document.querySelector("#app-container"),
    );
}
