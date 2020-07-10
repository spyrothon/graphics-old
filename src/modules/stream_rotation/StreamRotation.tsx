import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import { getActiveRunIds } from "../runs/ActiveRunStore";
import Stream from "../streams/components/Stream";
import * as StreamRotationActions from "./StreamRotationActions";
import {
  getShouldRotate,
  getNextRotatesAt,
  getFeaturedLeftId,
  getFeaturedRightId,
} from "./StreamRotationStore";

import styles from "./StreamRotation.mod.css";

type StreamRotationProps = {
  className?: string;
};

export default function StreamRotation(props: StreamRotationProps) {
  const { className } = props;

  const dispatch = useSafeDispatch();

  const activeRunIds = useSafeSelector(getActiveRunIds);
  const [featuredLeftId, featuredRightId] = useSafeSelector((state) => [
    getFeaturedLeftId(state),
    getFeaturedRightId(state),
  ]);
  const [leftId, centerId, rightId] = activeRunIds.filter(
    (runId) => runId != featuredLeftId && runId != featuredRightId,
  );
  console.log(featuredLeftId, featuredRightId, leftId, centerId, rightId);

  const { nextRotatesAt, shouldRotate } = useSafeSelector((state) => ({
    nextRotatesAt: getNextRotatesAt(state),
    shouldRotate: getShouldRotate(state),
  }));

  const [rotateLeft, setRotateLeft] = React.useState(false);

  const rotateFeatured = React.useCallback(() => {
    const featuredId = rotateLeft ? featuredLeftId : featuredRightId;

    const featuredIndex = activeRunIds.findIndex((runId) => runId == featuredId);
    let nextFeaturedId;
    for (let i = 1; i <= activeRunIds.length; i++) {
      i += featuredIndex;
      const runId = activeRunIds[i % activeRunIds.length];
      if (runId != featuredLeftId && runId != featuredRightId) {
        nextFeaturedId = runId;
        break;
      }
    }

    dispatch(
      rotateLeft
        ? StreamRotationActions.setFeaturedRunLeft(nextFeaturedId, nextRotatesAt)
        : StreamRotationActions.setFeaturedRunRight(nextFeaturedId, nextRotatesAt),
    );
    setRotateLeft(!rotateLeft);
  }, [activeRunIds, nextRotatesAt]);

  // set the initial featured runs
  React.useEffect(() => {
    const [left, right] = activeRunIds;
    dispatch(StreamRotationActions.setFeaturedRunLeft(left, nextRotatesAt));
    dispatch(StreamRotationActions.setFeaturedRunRight(right, nextRotatesAt));
  }, []);

  React.useEffect(() => {
    if (!shouldRotate) return;
    rotateFeatured();
  }, [shouldRotate]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.featuredLeft}>
        <Stream runId={featuredLeftId} key="fleft" volume={0.9} />
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
