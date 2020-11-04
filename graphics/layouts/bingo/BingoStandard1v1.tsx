import * as React from "react";

import { useSafeSelector } from "../../Store";
import BingoBoard from "../../modules/bingo/BingoBoard";
import GameInfo from "../../modules/game-info/GameInfo";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";
import Timer from "../../uikit/Timer";

import styles from "./BingoStandard1v1.mod.css";

export default function BingoStandard1v1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners: [left, right] = [], commentators = [] } = currentRun ?? {};

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <BingoBoard className={styles.bingoBoard} />
      <FeedArea className={styles.game2} />

      <div className={styles.centerStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          <Timer className={styles.timer} elapsedSeconds={2523} />
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
      </div>
      {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}

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
