import * as React from "react";
import classNames from "classnames";

import styles from "./Logo.mod.css";

type LogoProps = {
  className?: string;
};

export default function Logo(props: LogoProps) {
  return (
    <div className={classNames(styles.logo, props.className)}>
      <div className={styles.logoText}>The 1545</div>
    </div>
  );
}
