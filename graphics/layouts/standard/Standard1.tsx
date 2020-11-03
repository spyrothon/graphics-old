import * as React from "react";

import { useSafeSelector } from "../../Store";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import Category from "../../uikit/Category";
import FeedArea from "../../uikit/FeedArea";
import GameName from "../../uikit/GameName";
import Layout from "../../uikit/Layout";

import styles from "./Standard1.mod.css";

export default function Standard1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  return (
    <Layout>
      <GameName className={styles.gameName} name={currentRun?.gameName} />
      <Category className={styles.categoryName}>{currentRun?.categoryName}</Category>
      <FeedArea className={styles.webcam} />
      <FeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}
