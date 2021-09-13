import * as React from "react";

import { useSafeSelector } from "../../Store";
import ArtRotation from "../../modules/art/ArtRotation";
import GameInfo from "../../modules/game-info/GameInfo";
import Omnibar from "../../modules/omnibar/Omnibar";
import RunStore from "../../modules/runs/RunStore";
import RunUtils from "../../modules/runs/RunUtils";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import RunTimer from "../../modules/time/RunTimer";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";

import styles from "./Standard2.mod.css";

export default function Standard2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const showWebcam = RunUtils.hasAnyWebcam(currentRun);
  const [left, right] = RunUtils.getVisibleParticipants(runners);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />

      {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}

      <div className={styles.centerStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
        {showWebcam ? (
          <FeedArea className={styles.webcam} />
        ) : visibleCommentators.length > 0 ? (
          <div className={styles.commentaryArea}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
      </div>

      <ArtRotation className={styles.artRotation} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
