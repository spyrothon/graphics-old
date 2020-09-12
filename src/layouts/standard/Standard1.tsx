import * as React from "react";

import GameFeedArea from "../../uikit/GameFeedArea";
import GameName from "../../uikit/GameName";
import Layout from "../../uikit/Layout";

import styles from "./Standard1.mod.css";
import { useSafeSelector } from "../../Store";

export default function Standard1() {
  const gameName = useSafeSelector((state) => state.runInfo.gameName);

  return (
    <Layout>
      <GameName className={styles.gameName} name={gameName} />
      <GameFeedArea className={styles.game1} />
      <div className={styles.omnibar} />
    </Layout>
  );
}
