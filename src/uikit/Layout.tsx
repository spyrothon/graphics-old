import * as React from "react";

import style from "./Layout.mod.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return <div className={style.layout}>{children}</div>;
}
