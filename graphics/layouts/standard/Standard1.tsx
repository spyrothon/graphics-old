import * as React from "react";

import { useSafeSelector } from "../../Store";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import * as DurationUtils from "../../modules/time/DurationUtils";
import Category from "../../uikit/Category";
import FeedArea from "../../uikit/FeedArea";
import GameName from "../../uikit/GameName";
import Layout from "../../uikit/Layout";
import Timer from "../../uikit/Timer";

import styles from "./Standard1.mod.css";

export default function Standard1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  return (
    <Layout>
      <div className={styles.sidebar}>
        <GameName className={styles.gameName} name={currentRun?.gameNameFormatted} />
        <Category className={styles.categoryName}>{currentRun?.categoryName}</Category>
        <div className={styles.runInfo}>
          <div className={styles.releaseYear}>
            <span className={styles.descriptor}>RELEASED:</span> {currentRun?.releaseYear}
          </div>
          <div className={styles.platform}>
            <span className={styles.descriptor}>PLAYED ON:</span> {currentRun?.platform}
          </div>
          {currentRun?.estimateSeconds != null ? (
            <div className={styles.estimate}>
              <span className={styles.descriptor}>ESTIMATE:</span>{" "}
              {DurationUtils.toString(currentRun?.estimateSeconds)}
            </div>
          ) : null}
        </div>
        <FeedArea className={styles.webcam} />
        <Timer
          className={styles.timer}
          elapsedSeconds={2523}
          estimate={currentRun?.estimateSeconds}
        />
      </div>
      <FeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}
