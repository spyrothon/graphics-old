import "./style/reset.css";
import "./style/theme.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./pages/App";
import StateSync from "./modules/socket/StateSync";

import { store } from "./Store";

// import Admin from "./admin/admin.js";
// import { adminStore } from "./admin/reducer.js";

// if (window.location.pathname === "/admin") {
//   ReactDOM.render(
//     <Provider store={adminStore}>
//       <Admin />
//     </Provider>,
//     document.querySelector("#app-container"),
//   );
// } else {
ReactDOM.render(
  <Provider store={store}>
    <App />
    <StateSync />
  </Provider>,
  document.querySelector("#app-container"),
);
// }
