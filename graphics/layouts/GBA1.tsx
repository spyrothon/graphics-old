import * as React from "react";

import { useSafeSelector } from "../Store";
import RunStore from "../modules/runs/RunStore";
import ScheduleStore from "../modules/schedules/ScheduleStore";
import * as DurationUtils from "../modules/time/DurationUtils";
import Category from "../uikit/Category";
import FeedArea from "../uikit/FeedArea";
import GameName from "../uikit/GameName";
import Layout from "../uikit/Layout";
import NameplateGroup from "../uikit/NameplateGroup";
import Timer from "../uikit/Timer";

import styles from "./GBA1.mod.css";

export default function GBA1() {
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
    runners = [],
    commentators = [],
  } = currentRun ?? {};

  return (
    <Layout>
      <div className={styles.sidebar}>
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
        <FeedArea className={styles.webcam} />
        <div className={styles.participantsTimer}>
          <NameplateGroup className={styles.runners} participants={runners ?? []} title="Runners" />
          <Timer className={styles.timer} elapsedSeconds={2523} />
          <div className={styles.commentaryArea}>
            {commentators.length > 0 ? (
              <NameplateGroup
                className={styles.commentators}
                participants={commentators ?? []}
                title="Commentary"
              />
            ) : null}
          </div>
        </div>
      </div>
      <FeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}
