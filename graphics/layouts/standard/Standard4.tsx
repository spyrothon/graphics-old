import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../Store";
import GameInfo from "../../modules/game-info/GameInfo";
import Omnibar from "../../modules/omnibar/Omnibar";
import RunStore from "../../modules/runs/RunStore";
import RunUtils from "../../modules/runs/RunUtils";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";
import Timer from "../../uikit/Timer";

import styles from "./Standard4.mod.css";

export default function Standard4() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const [topLeft, topRight, bottomLeft, bottomRight] = RunUtils.getVisibleParticipants(runners);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />
      <FeedArea className={styles.game3} />
      <FeedArea className={styles.game4} />

      <div className={styles.centerStack}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {topLeft != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateTopLeft)}
            participant={topLeft}
          />
        ) : null}
        <Timer className={styles.timer} />
        {topRight != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateTopRight)}
            participant={topRight}
          />
        ) : null}
        {bottomLeft != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateBottomLeft)}
            participant={bottomLeft}
          />
        ) : null}
        <Timer className={styles.timer} elapsedSeconds={2533} />
        {bottomRight != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateBottomRight)}
            participant={bottomRight}
          />
        ) : null}
        {commentators.length > 0 ? (
          <div className={styles.commentaryArea}>
            <NameplateGroup
              className={styles.commentators}
              participants={RunUtils.getVisibleParticipants(commentators)}
              title="Commentary"
            />
          </div>
        ) : null}
      </div>

      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
