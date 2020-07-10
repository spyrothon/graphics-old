import * as React from "react";
import classNames from "classnames";
import humanizeDuration from "humanize-duration";
import _ from "lodash";
import { DateTime } from "luxon";

import { useSafeSelector } from "../../../Store";
import useTimeline from "../../../hooks/useTimeline";
import RunSummary from "../../../uikit/RunSummary";
import SlideCycle from "../../../uikit/anim/SlideCycle";
import * as TimeStore from "../../timers/TimerStore";
import * as UpcomingRunsStore from "../../runs/UpcomingRunsStore";

import styles from "./TeamRuns.mod.css";

type UpcomingRunsProps = {
  onComplete?: () => unknown;
};

export default function UpcomingRuns(props: UpcomingRunsProps) {
  const { onComplete } = props;

  const { currentTime, upcomingRuns } = useSafeSelector((state) => {
    return {
      currentTime: TimeStore.getCurrentTime(state),
      upcomingRuns: UpcomingRunsStore.getUpcomingRuns(state, { count: 10 }),
    };
  });

  const headerRef = React.useRef<HTMLDivElement>(null);
  const timeline = useTimeline({ paused: true, autoRemoveChildren: true });
  const childTimeline = useTimeline({ autoRemoveChildren: true });

  React.useLayoutEffect(() => {
    if (headerRef.current == null) return;

    timeline
      // In
      .set(headerRef.current, { opacity: 0 })
      .set(headerRef.current, { x: -320 })
      .to(headerRef.current, 0.2, { opacity: 1 })
      .to(headerRef.current, 0.3, { x: 0, ease: "Power2.easeOut" })
      // Children
      .add(childTimeline, "-=0.1")
      // Out
      .to(headerRef.current, 0.5, { x: -320, ease: "Power2.easeIn" })
      .eventCallback("onComplete", () => onComplete?.())
      .play();
  }, []);

  const renderRunStartTime = (startTime: DateTime) => {
    const diffMinutes = startTime.diff(currentTime).as("minutes");
    const roundedTimeUntil = Math.round(diffMinutes) * 60 * 1000;
    const timeString = humanizeDuration(roundedTimeUntil, { largest: 2, units: ["h", "m"] });
    return (
      <p>
        <span style={{ opacity: 0.6 }}>Starts in </span>
        {timeString}
      </p>
    );
  };

  return (
    <div className={styles.content}>
      <div ref={headerRef} className={classNames(styles.teamHeader, styles.inverted)}>
        <p>Upcoming Runs</p>
      </div>
      <SlideCycle className={styles.content} timeline={childTimeline}>
        {_.map(upcomingRuns, ({ runId, estimatedStartTime }) => (
          <RunSummary
            className={styles.run}
            key={runId}
            runId={runId}
            midRow="game"
            timeRow={renderRunStartTime(estimatedStartTime)}
          />
        ))}
      </SlideCycle>
    </div>
  );
}
