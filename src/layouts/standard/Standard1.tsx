import * as React from "react";

import * as RunInfoStore from "../../modules/run-info/RunInfoStore";
import GameFeedArea from "../../uikit/GameFeedArea";
import GameName from "../../uikit/GameName";
import Layout from "../../uikit/Layout";

import styles from "./Standard1.mod.css";
import { useSafeSelector } from "../../Store";

export default function Standard1() {
  const currentRun = useSafeSelector((state) => RunInfoStore.getCurrentRunInfo(state));

  return (
    <Layout>
      <GameName className={styles.gameName} name={currentRun.gameName} />
      <GameName className={styles.categoryName} name={currentRun.categoryName} />
      <GameFeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}
