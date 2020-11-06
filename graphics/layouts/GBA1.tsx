import * as React from "react";

import { useSafeSelector } from "../Store";
import GameInfo from "../modules/game-info/GameInfo";
import Omnibar from "../modules/omnibar/Omnibar";
import RunStore from "../modules/runs/RunStore";
import RunUtils from "../modules/runs/RunUtils";
import ScheduleStore from "../modules/schedules/ScheduleStore";
import FeedArea from "../uikit/FeedArea";
import Layout from "../uikit/Layout";
import NameplateGroup from "../uikit/NameplateGroup";
import Timer from "../uikit/Timer";

import styles from "./GBA1.mod.css";
import ArtRotation from "../modules/art/ArtRotation";

export default function GBA1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const showWebcam = RunUtils.hasAnyWebcam(currentRun);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {showWebcam ? <FeedArea className={styles.webcam} /> : null}
        <div className={styles.participantsTimer}>
          <NameplateGroup
            className={styles.runners}
            participants={RunUtils.getVisibleParticipants(runners)}
            title="Runners"
          />
          <Timer className={styles.timer} />
          {visibleCommentators.length > 0 ? (
            <div className={styles.commentaryArea}>
              <NameplateGroup
                className={styles.commentators}
                participants={visibleCommentators}
                title="Commentary"
              />
            </div>
          ) : showWebcam ? (
            <div className={styles.spacer} />
          ) : null}
        </div>
        {!showWebcam ? <ArtRotation className={styles.artRotation} /> : null}
      </div>
      <FeedArea className={styles.game1} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
