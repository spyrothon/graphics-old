import * as React from "react";

import Logo from "../../uikit/Logo";
import ActiveRunSummary from "./details/ActiveRunSummary";
import TeamRuns from "./details/TeamRuns";

import styles from "./Omnibar.mod.css";

export default function Omnibar() {
  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <TeamRuns teamId="32" />
      </div>
      <div className={styles.bottomRow}>
        <Logo className={styles.logo} />
        <ActiveRunSummary />
      </div>
    </div>
  );
}
