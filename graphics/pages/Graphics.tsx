import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../Store";
import Standard1 from "../layouts/standard/Standard1";
import RemoteActionReceiverManager from "../modules/remote/RemoteActionReceiverManager";
import ThemeProvider from "../uikit/ThemeProvider";
import SVGLibrary from "../uikit/svg/SVGLibrary";

export default function Graphics() {
  React.useEffect(() => {
    RemoteActionReceiverManager.init();
    return () => {
      RemoteActionReceiverManager.stop();
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SVGLibrary />
        <Standard1 />
      </ThemeProvider>
    </Provider>
  );
}
