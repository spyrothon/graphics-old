import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../Store";
import { getActiveRunIds } from "../runs/ActiveRunStore";
import Stream from "../streams/components/Stream";

import styles from "./StreamRotation.mod.css";

type StreamRotationProps = {
  className?: string;
};

export default function StreamRotation(props: StreamRotationProps) {
  const { className } = props;

  const activeRunIds = useSafeSelector(getActiveRunIds);
  const [featuredLeftId, featuredRightId, leftId, centerId, rightId] = activeRunIds;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.featuredLeft}>
        <Stream runId={featuredLeftId} key="fleft" volume={0} />
      </div>
      <div className={styles.featuredRight}>
        <Stream runId={featuredRightId} key="fright" volume={0} />
      </div>

      <div className={styles.left}>
        <Stream runId={leftId} key="left" volume={0} />
      </div>
      <div className={styles.center}>
        <Stream runId={centerId} key="center" volume={0} />
      </div>
      <div className={styles.right}>
        <Stream runId={rightId} key="right" volume={0} />
      </div>
    </div>
  );
}
