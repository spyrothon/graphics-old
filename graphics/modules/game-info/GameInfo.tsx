import * as React from "react";
import classNames from "classnames";

import { Run } from "../../../api/APITypes";
import Category from "../../uikit/Category";
import GameName from "../../uikit/GameName";
import * as DurationUtils from "../time/DurationUtils";

import styles from "./GameInfo.mod.css";

type GameInfoProps = {
  run: Run;
  className?: string;
};

export default function GameInfo(props: GameInfoProps) {
  const { run, className } = props;
  const { gameNameFormatted, categoryName, releaseYear, platform, estimateSeconds } = run;

  return (
    <div className={classNames(styles.container, className)}>
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
  );
}
