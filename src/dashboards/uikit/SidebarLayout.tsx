import * as React from "react";

import styles from "./SidebarLayout.mod.css";

type SidebarLayoutProps = {
  renderHeader: () => React.ReactNode;
  renderSidebar: () => React.ReactNode;
  renderMain: () => React.ReactNode;
};

export default function SidebarLayout(props: SidebarLayoutProps) {
  const { renderHeader, renderSidebar, renderMain } = props;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{renderHeader()}</div>
      <div className={styles.content}>
        <div className={styles.sidebar}>{renderSidebar()}</div>
        <div className={styles.main}>{renderMain()}</div>
      </div>
    </div>
  );
}
