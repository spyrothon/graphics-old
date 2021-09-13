import * as React from "react";

import { useSafeSelector } from "../../Store";
import BingoBoard from "../../modules/bingo/BingoBoard";
import Omnibar from "../../modules/omnibar/Omnibar";
import GameInfo from "../../modules/game-info/GameInfo";
import RunStore from "../../modules/runs/RunStore";
import RunUtils from "../../modules/runs/RunUtils";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import RunTimer from "../../modules/time/RunTimer";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";

import styles from "./BingoStandard1v1.mod.css";
import ArtRotation from "../../modules/art/ArtRotation";

export default function BingoStandard1v1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const [left, right] = RunUtils.getVisibleParticipants(runners);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <BingoBoard className={styles.bingoBoard} />
      <FeedArea className={styles.game2} />

      <div className={styles.centerStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
      </div>

      <div className={styles.infoRow}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {visibleCommentators.length > 0 ? (
          <div className={styles.commentaryArea}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
        <ArtRotation className={styles.artRotation} />
      </div>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
