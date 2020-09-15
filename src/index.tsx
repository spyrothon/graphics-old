import * as React from "react";
import * as ReactDOM from "react-dom";

import AdminHelmet from "./dashboards/AdminHelmet";
import Dashboards from "./pages/Dashboards";
import Graphics from "./pages/Graphics";

switch (window.location.pathname) {
  case "/admin":
    ReactDOM.render(
      <>
        <AdminHelmet />
        <Dashboards />
      </>,
      document.querySelector("#app-container"),
    );
    break;

  default:
    ReactDOM.render(<Graphics />, document.querySelector("#app-container"));
}
