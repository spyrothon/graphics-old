import * as React from "react";

import ArtRotation from "../../modules/art/ArtRotation";
import Omnibar from "../../modules/omnibar/Omnibar";
import Layout from "../../uikit/Layout";
import BreakUpNext from "./BreakUpNext";

import styles from "./Break.mod.css";

import logo from "../../res/spyrothon_6_logo.png";

export default function BreakRight() {
  return (
    <Layout showBackground={false}>
      <div className={styles.breakRight}>
        <img className={styles.logo} src={logo} />
        <BreakUpNext className={styles.upcoming} reverse />
        <div className={styles.backSoon}>
          <div className={styles.backHeader}>Stay fired up, Bob</div>
          <div className={styles.backSub}>We'll be right back</div>
        </div>
      </div>
      <ArtRotation className={styles.artRotationRight} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
