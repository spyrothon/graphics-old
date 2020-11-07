import * as React from "react";

import Omnibar from "../../modules/omnibar/Omnibar";
import Layout from "../../uikit/Layout";

import styles from "./InterviewOpen.mod.css";

export default function InterviewOpen() {
  return (
    <Layout>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
