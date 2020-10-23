import * as React from "react";
import * as ReactDOM from "react-dom";

import AdminHelmet from "./AdminHelmet";
import Dashboards from "./Dashboards";

ReactDOM.render(
  <>
    <AdminHelmet />
    <Dashboards />
  </>,
  document.querySelector("#app-container"),
);
