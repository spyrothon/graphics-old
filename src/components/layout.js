import * as React from "react";

import { ASSETS_URL } from "../constants";

import style from "./layout.mod.css";

const Layout = (props) => {
  const { children } = props;

  return <div class={style.layout}>{children}</div>;
};

export default Layout;
