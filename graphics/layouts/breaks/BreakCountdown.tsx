import * as React from "react";

import { Schedule } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import DurationUtils from "../../modules/time/DurationUtils";
import Layout from "../../uikit/Layout";

import styles from "./Break.mod.css";

function getRemainingSeconds(startTime: Date) {
  return (new Date().getTime() - startTime.getTime()) / 1000;
}

function CountdownTimer({ schedule }: { schedule: Schedule }) {
  const { startTime } = schedule;
  const [time, setTime] = React.useState(() => getRemainingSeconds(startTime));

  useAnimationFrame(() => {
    return setTime(getRemainingSeconds(startTime));
  }, [startTime]);

  return <>{DurationUtils.toString(time)}</>;
}

export default function BreakCountdown() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  if (schedule == null) return null;

  return (
    <Layout showBackground={false}>
      <div className={styles.breakCountdown}>
        <img className={styles.logo} src={schedule.logoUrl} />
        <div className={styles.backSoon}>
          <div className={styles.backSub}>Starting soon...</div>
          <div className={styles.backHeader}>
            <CountdownTimer schedule={schedule} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
