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

import styles from "./DS1.mod.css";

export default function DS1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [] } = currentRun ?? {};

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        <FeedArea className={styles.webcam} />
        <div className={styles.participantsTimer}>
          <Timer className={styles.timer} />
          <NameplateGroup
            className={styles.runners}
            participants={RunUtils.getVisibleParticipants(runners)}
            title="Runners"
          />
        </div>
      </div>
      <FeedArea className={styles.game1} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
