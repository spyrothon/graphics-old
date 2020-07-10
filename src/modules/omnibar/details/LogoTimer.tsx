import * as React from "react";
import classNames from "classnames";

import Logo from "../../../uikit/Logo";
import EventTimer from "../../../uikit/EventTimer";

import styles from "./LogoTimer.mod.css";

type LogoTimerProps = {
  className?: string;
};

export default function LogoTimer(props: LogoTimerProps) {
  const { className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <Logo className={styles.logo} />
      <EventTimer className={styles.timer} />
    </div>
  );
}
