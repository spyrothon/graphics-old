import * as React from "react";
import Header from "./uikit/Header";
import RemoteConnectionStatus from "./modules/connection/RemoteConnectionStatus";

import styles from "./DashboardHeader.mod.css";

type DashboardHeaderProps = {
  name: React.ReactNode;
};

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { name } = props;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header size={Header.Sizes.H1} marginless>
          {name}
        </Header>
      </div>
      <div className={styles.right}>
        <RemoteConnectionStatus />
      </div>
    </div>
  );
}
