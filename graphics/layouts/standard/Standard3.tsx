import * as React from "react";
import classNames from "classnames";

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

import styles from "./Standard3.mod.css";

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
      <ArtRotation className={styles.artRotation} />

      <div className={styles.centerStack}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {topLeft != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateTopLeft)}
            participant={topLeft}
          />
        ) : null}
        {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
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
