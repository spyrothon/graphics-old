import * as React from "react";
import classNames from "classnames";

import * as DurationUtils from "../modules/time/DurationUtils";

import styles from "./Timer.mod.css";

type TimerProps = {
  elapsedSeconds?: number;
  estimate?: number;
  className?: string;
};

export default function Timer(props: TimerProps) {
  const { elapsedSeconds, estimate, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.timerBox}>
        <div className={styles.timer}>{DurationUtils.toString(elapsedSeconds ?? 0)}</div>
      </div>
      {estimate != null ? (
        <div className={styles.estimate}>EST: {DurationUtils.toString(estimate ?? 0)}</div>
      ) : null}
    </div>
  );
}
