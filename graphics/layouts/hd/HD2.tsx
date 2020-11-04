import * as React from "react";

import { useSafeSelector } from "../../Store";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";
import Timer from "../../uikit/Timer";

import styles from "./HD2.mod.css";
import GameInfo from "../../modules/game-info/GameInfo";

export default function HD2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners: [left, right] = [], commentators = [] } = currentRun ?? {};

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />

      <div className={styles.topStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          <Timer className={styles.timer} elapsedSeconds={2523} />
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
      </div>

      {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}

      <FeedArea className={styles.webcam} />

      <div className={styles.commentaryArea}>
        {commentators.length > 0 ? (
          <NameplateGroup
            className={styles.commentators}
            participants={commentators ?? []}
            title="Commentary"
          />
        ) : null}
      </div>
      <div className={styles.omnibar} />
    </Layout>
  );
}
