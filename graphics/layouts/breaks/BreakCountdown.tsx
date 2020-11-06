import * as React from "react";

import Omnibar from "../../modules/omnibar/Omnibar";
import Layout from "../../uikit/Layout";

import styles from "./Break.mod.css";

import logo from "../../res/spyrothon_6_logo.png";
import LiveTimer from "../../uikit/LiveTimer";
import { DateTime } from "luxon";

const START_TIME = DateTime.fromISO("2020-11-06T24:00:00Z");

export default function BreakCountdown() {
  return (
    <Layout showBackground={false}>
      <div className={styles.breakCountdown}>
        <img className={styles.logo} src={logo} />
        <div className={styles.backSoon}>
          <div className={styles.backSub}>Starting soon...</div>
          <LiveTimer startTime={START_TIME} className={styles.backHeader} />
        </div>
      </div>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
