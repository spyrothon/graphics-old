import * as React from "react";
import classNames from "classnames";

import styles from "./StatusDot.mod.css";

type StatusDotProps = {
  boolean?: boolean;
};

export default function StatusDot(props: StatusDotProps) {
  const { boolean } = props;

  return (
    <div className={classNames(styles.dot, { [styles.good]: boolean, [styles.bad]: !boolean })} />
  );
}
