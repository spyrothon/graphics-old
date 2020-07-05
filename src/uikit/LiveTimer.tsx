import * as React from "react";

import { getCurrentTime } from "../modules/timers/TimerStore";
import { useSafeSelector } from "../Store";
import { diffSeconds, runTime, timeFromISO } from "../Util";

type LiveTimerProps = {
  startedAt: string;
  className?: string;
};

export default function LiveTimer(props: LiveTimerProps) {
  const { startedAt, className } = props;

  const elapsedTime = useSafeSelector((state) => {
    const now = getCurrentTime(state);
    const elapsedTimeSeconds = diffSeconds(now, timeFromISO(startedAt));
    return runTime(elapsedTimeSeconds || 0);
  });

  return <span className={className}>{elapsedTime}</span>;
}
