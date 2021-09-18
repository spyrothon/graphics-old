import * as React from "react";

import Layout from "../../uikit/Layout";

import styles from "./Break.mod.css";

import logo from "../../res/spyrothon_logo.png";

export default function BreakCountdown() {
  return (
    <Layout showBackground={false}>
      <div className={styles.breakCountdown}>
        <img className={styles.logo} src={logo} />
        <div className={styles.backSoon}>
          <div className={styles.backSub}>Starting soon...</div>
        </div>
      </div>
    </Layout>
  );
}
