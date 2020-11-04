import * as React from "react";

import { useSafeSelector } from "../../Store";
import RunStore from "../../modules/runs/RunStore";
import ScheduleStore from "../../modules/schedules/ScheduleStore";
import * as DurationUtils from "../../modules/time/DurationUtils";
import Category from "../../uikit/Category";
import FeedArea from "../../uikit/FeedArea";
import GameName from "../../uikit/GameName";
import Layout from "../../uikit/Layout";
import Nameplate from "../../uikit/Nameplate";
import NameplateGroup from "../../uikit/NameplateGroup";
import Timer from "../../uikit/Timer";

import styles from "./Standard2.mod.css";

export default function Standard2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const {
    gameNameFormatted,
    categoryName,
    releaseYear,
    platform,
    estimateSeconds,
    runners: [left, right] = [],
    commentators = [],
  } = currentRun ?? {};

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />
      <div className={styles.gameInfo}>
        <GameName className={styles.gameName} name={gameNameFormatted} />
        <Category className={styles.categoryName}>{categoryName}</Category>
        <div className={styles.runInfo}>
          <div className={styles.releaseYear}>
            <span className={styles.descriptor}>RELEASED:</span> {releaseYear}
          </div>
          <div className={styles.platform}>
            <span className={styles.descriptor}>PLAYED ON:</span> {platform}
          </div>
          {estimateSeconds != null ? (
            <div className={styles.estimate}>
              <span className={styles.descriptor}>ESTIMATE:</span>{" "}
              {DurationUtils.toString(estimateSeconds)}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.centerStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          <Timer className={styles.timer} elapsedSeconds={2523} />
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
        <FeedArea className={styles.webcam} />
      </div>

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
