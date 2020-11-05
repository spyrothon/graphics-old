import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "../../Store";
import BingoBoard from "../../modules/bingo/BingoBoard";
import Omnibar from "../../modules/omnibar/Omnibar";
import GameInfo from "../../modules/game-info/GameInfo";
import RunStore from "../../modules/runs/RunStore";
import RunUtils from "../../modules/runs/RunUtils";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import FeedArea from "../../uikit/FeedArea";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import Timer from "../../uikit/Timer";

import styles from "./BingoStandard2v2.mod.css";

export default function BingoStandard2v2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [] } = currentRun ?? {};
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
        <Timer className={styles.timer} elapsedSeconds={2523} />
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
        <BingoBoard className={styles.bingoBoard} />
        {bottomRight != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateBottomRight)}
            participant={bottomRight}
          />
        ) : null}
      </div>

      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
