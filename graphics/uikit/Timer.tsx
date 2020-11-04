import * as React from "react";
import classNames from "classnames";

import * as DurationUtils from "../modules/time/DurationUtils";

import styles from "./Timer.mod.css";
import SlidingLines from "./svg/SlidingLines";

type TimerProps = {
  elapsedSeconds?: number;
  className?: string;
};

export default function Timer(props: TimerProps) {
  const { elapsedSeconds, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.timerBox}>
        <SlidingLines className={styles.background} />
        <div className={styles.timer}>{DurationUtils.toString(elapsedSeconds ?? 0)}</div>
      </div>
    </div>
  );
}
