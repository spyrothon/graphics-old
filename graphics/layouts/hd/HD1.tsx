import * as React from "react";

import { useSafeSelector } from "../../Store";
import GameInfo from "../../modules/game-info/GameInfo";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import NameplateGroup from "../../uikit/NameplateGroup";
import Timer from "../../uikit/Timer";

import styles from "./HD1.mod.css";

export default function HD1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        <FeedArea className={styles.webcam} />
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.timerArea}>
          <Timer className={styles.timer} elapsedSeconds={2523} />
        </div>
        <NameplateGroup className={styles.runners} participants={runners ?? []} title="Runners" />
        <div className={styles.commentaryArea}>
          {commentators.length > 0 ? (
            <NameplateGroup
              className={styles.commentators}
              participants={commentators ?? []}
              title="Commentary"
            />
          ) : null}
        </div>
      </div>
      <FeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}