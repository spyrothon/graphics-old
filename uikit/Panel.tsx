import * as React from "react";
import classNames from "classnames";

import styles from "./Panel.mod.css";
import Header from "./Header";

type PanelProps = {
  name?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Panel(props: PanelProps) {
  const { name, className, children } = props;
  return (
    <div className={classNames(styles.panel, className)}>
      <Header size={Header.Sizes.H2}>{name}</Header>
      {children}
    </div>
  );
}
